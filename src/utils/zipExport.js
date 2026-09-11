/**
 * Pure JavaScript ZIP archive generator and downloader.
 * Conforms to the standard PKZip 2.0 specification (STORE mode / uncompressed).
 * Requires zero external dependencies.
 */

// CRC-32 Lookup Table
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[i] = c >>> 0;
}

function computeCRC32(uint8Array) {
  let crc = 0xffffffff;
  for (let i = 0; i < uint8Array.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ uint8Array[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function getDosDateTime(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  const dosTime = (hours << 11) | (minutes << 5) | seconds;
  const dosDate = ((year - 1980) << 9) | (month << 5) | day;

  return { dosTime, dosDate };
}

/**
 * Creates a valid PKZip file Uint8Array from a list of files.
 * @param {Array<{ name: string, content: string }>} files
 * @returns {Uint8Array}
 */
export function createZipBuffer(files) {
  const textEncoder = new TextEncoder();
  const { dosTime, dosDate } = getDosDateTime();

  const localFileChunks = [];
  const centralDirChunks = [];
  let currentOffset = 0;

  for (const file of files) {
    const filenameBytes = textEncoder.encode(file.name);
    const contentBytes = textEncoder.encode(file.content || '');
    const crc = computeCRC32(contentBytes);
    const size = contentBytes.length;

    // --- Local File Header (30 bytes + name + content) ---
    const localHeader = new Uint8Array(30 + filenameBytes.length);
    const lv = new DataView(localHeader.buffer);

    lv.setUint32(0, 0x04034b50, true); // Local header signature
    lv.setUint16(4, 20, true); // Version needed (2.0)
    lv.setUint16(6, 0, true); // General purpose bit flag
    lv.setUint16(8, 0, true); // Compression method (0 = STORE)
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true); // Compressed size
    lv.setUint32(22, size, true); // Uncompressed size
    lv.setUint16(26, filenameBytes.length, true);
    lv.setUint16(28, 0, true); // Extra field length

    localHeader.set(filenameBytes, 30);
    localFileChunks.push(localHeader, contentBytes);

    // --- Central Directory Header (46 bytes + name) ---
    const centralHeader = new Uint8Array(46 + filenameBytes.length);
    const cv = new DataView(centralHeader.buffer);

    cv.setUint32(0, 0x02014b50, true); // Central dir signature
    cv.setUint16(4, 20, true); // Version made by
    cv.setUint16(6, 20, true); // Version needed (2.0)
    cv.setUint16(8, 0, true); // Bit flag
    cv.setUint16(10, 0, true); // Compression (0)
    cv.setUint16(12, dosTime, true);
    cv.setUint16(14, dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, filenameBytes.length, true);
    cv.setUint16(30, 0, true); // Extra field length
    cv.setUint16(32, 0, true); // Comment length
    cv.setUint16(34, 0, true); // Disk number start
    cv.setUint16(36, 0, true); // Internal attributes
    cv.setUint32(38, 0x81a40000, true); // External attributes (rw-r--r--)
    cv.setUint32(42, currentOffset, true); // Relative offset of local header

    centralHeader.set(filenameBytes, 46);
    centralDirChunks.push(centralHeader);

    currentOffset += localHeader.length + contentBytes.length;
  }

  // --- End of Central Directory Record (22 bytes) ---
  let centralDirSize = 0;
  for (const chunk of centralDirChunks) {
    centralDirSize += chunk.length;
  }

  const endRecord = new Uint8Array(22);
  const ev = new DataView(endRecord.buffer);

  ev.setUint32(0, 0x06054b50, true); // EOCD signature
  ev.setUint16(4, 0, true); // Number of this disk
  ev.setUint16(6, 0, true); // Disk with central directory
  ev.setUint16(8, files.length, true); // Total entries on this disk
  ev.setUint16(10, files.length, true); // Total entries
  ev.setUint32(12, centralDirSize, true); // Size of central directory
  ev.setUint32(16, currentOffset, true); // Offset of central directory
  ev.setUint16(20, 0, true); // Comment length

  // Combine all parts into single buffer
  const totalLength = currentOffset + centralDirSize + 22;
  const zipBuffer = new Uint8Array(totalLength);

  let writePtr = 0;
  for (const chunk of localFileChunks) {
    zipBuffer.set(chunk, writePtr);
    writePtr += chunk.length;
  }
  for (const chunk of centralDirChunks) {
    zipBuffer.set(chunk, writePtr);
    writePtr += chunk.length;
  }
  zipBuffer.set(endRecord, writePtr);

  return zipBuffer;
}

/**
 * Triggers a browser download of the generated project ZIP file.
 * @param {string} projectName - Base filename for the download (without .zip)
 * @param {Array<{ name: string, content: string }>} files - Array of files to include
 */
export function downloadProjectZip(projectName, files) {
  const safeName = (projectName || 'autodevai-project')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'autodevai-project';

  const zipBytes = createZipBuffer(files);
  const blob = new Blob([zipBytes], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${safeName}.zip`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

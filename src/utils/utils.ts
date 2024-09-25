import * as htmlToImage from 'html-to-image';

export const copyImageToClipboardFnc = async () => {
  const calendar = document.getElementById('calendar');
  if (calendar) {
    const blob = await htmlToImage.toBlob(calendar, { backgroundColor: 'white' });
    if (blob !== null) {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        .then(() => console.debug('Calendar image copied to clipboard!'))
        .catch(err => console.error('Failed to copy image: ', err));
    }
  }
}

export const getImageBlob = async () => await htmlToImage.toBlob(document.getElementById('calendar')!, { backgroundColor: 'white' });
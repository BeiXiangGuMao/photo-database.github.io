import {ZipWriter, BlobWriter} from './zip.min.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('gallery', () => ({
    images: [], selected: [], title: '',
    async init() {
      const f = new URLSearchParams(location.search).get('f');
      this.title = f === 'gallery1' ? '风景' : '人像';
      const res = await fetch(`https://api.github.com/repos/photo-database/photo-database.github.io/contents/data/${f}`);
      this.images = await res.json();
    },
    async download() {
      const zip = new ZipWriter(new BlobWriter());
      for (const url of this.selected) {
        const blob = await (await fetch(url)).blob();
        const name = url.split('/').pop();
        await zip.add(name, blob);
      }
      const blob = await zip.close();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'photos.zip';
      a.click();
    }
  }));
});
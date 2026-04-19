const ctx: Worker = self as any
self.onmessage = async (e: MessageEvent) => {
  const { urls } = e.data
  const bitmaps: ImageBitmap[] = []
  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch(urls[i])
      const blob = await res.blob()
      const bitmap = await createImageBitmap(blob)
      bitmaps.push(bitmap)
      self.postMessage({ type: 'PROGRESS', loaded: i + 1, total: urls.length })
    } catch { bitmaps.push(null as any) }
  }
  self.postMessage({ type: 'COMPLETE', bitmaps }, bitmaps.filter(Boolean).map(b => b as any))
}

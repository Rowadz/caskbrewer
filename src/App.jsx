import React, { useRef } from 'react'
import { useAsyncFn } from 'react-use'
import axios from 'axios'
import JSZip from 'jszip'
import { join, parse } from 'path-browserify'

const App = () => {
  const iframeRef = useRef()
  const [state, getZipFile] = useAsyncFn(async () => {
    const { data } = await axios.get(join('src', 'static.zip'), {
      responseType: 'arraybuffer',
    })
    const zip = new JSZip()
    await zip.loadAsync(data)
    const htmlStr = await zip.file('index.html').async('text')
    const html = document.createElement('html')
    html.innerHTML = htmlStr
    const links = html.getElementsByTagName('link')

    for (const link of links) {
      const { base } = parse(link.href)
      const css = await zip.file(base).async('text')
      const [head] = html.getElementsByTagName('head')
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(css))
      head.appendChild(style)
    }

    

    const scripts = html.getElementsByTagName('script')
    for (const script of scripts) {
      const { base } = parse(script.src)
      const js = await zip.file(base).async('text')
      const jsScriptTag = document.createElement('script')
      const jsBlob = new Blob([js], { type: 'text/javascript' })

      const url = URL.createObjectURL(jsBlob)
      jsScriptTag.src = url

      const iFrameDoc = iframeRef.current.contentWindow.document
      iFrameDoc.body.appendChild(jsScriptTag)
      
      // iFrameDoc.body.removeChild(jsScriptTag)
      URL.revokeObjectURL(url)
    }

    const doc = iframeRef.current.contentWindow.document
    doc.open()
    doc.write(html.innerHTML)
    doc.close()
  }, [])

  return (
    <>
      <button onClick={getZipFile}>
        {state.loading
          ? 'LOADING...'
          : 'Click to load and run the static website'}
      </button>
      <iframe ref={iframeRef} width="100%" height={400} />
    </>
  )
}

export default App

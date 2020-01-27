import marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import ReactDOM from 'react-dom/server'

import Link from '../components/link'

const renderer = new marked.Renderer()

renderer.link = (href, _, text) =>
  ReactDOM.renderToStaticMarkup(
    <Link href={href} external underline>
      {text}
    </Link>
  )

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  renderer,
  highlight: (code, language) => {
    return Prism.highlight(code, Prism.languages[language])
  }
})

export default markdown => marked(markdown)
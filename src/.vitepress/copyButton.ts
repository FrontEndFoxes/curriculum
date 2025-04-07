import type { MarkdownItEnv } from 'vitepress'

export function addCopyButton(md: any) {
  const defaultRender = md.renderer.rules.fence?.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: MarkdownItEnv, self: any) => {
    const token = tokens[idx]
    const prevToken = tokens[idx - 1]
    const isInDetails = prevToken?.type === 'html_block' && prevToken?.content.includes('<details>')
    
    if (token.info.trim() === 'mermaid') {
      return defaultRender(tokens, idx, options, env, self)
    }

    const lang = token.info.trim()
    const rawCode = defaultRender(tokens, idx, options, env, self)
    const code = rawCode.slice(
      rawCode.indexOf('<code>'),
      rawCode.indexOf('</code>')
    )

    const lines = code.split('\n')
    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((line, index) => `<span class="line-number">${index + 1}</span><br>`)
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`

    const buttonCode = `<button class="copy-code-button" title="Copy code"></button>`

    const finalCode = rawCode
      .replace('<!--beforeend-->', `${buttonCode}<!--beforeend-->`)
      .replace('extra-class', 'line-numbers-mode')
      .replace('</code>', `${lineNumbersWrapperCode}</code>`)

    return isInDetails ? finalCode : `<div class="code-block-wrapper">${finalCode}</div>`
  }
} 
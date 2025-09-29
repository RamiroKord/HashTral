import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import FloatImage from './components/FloatImage'

const config: DocsThemeConfig = {
  logo: <span>HashTral</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  
  // Add custom head for page title
  head: () => {
    const { asPath } = useRouter()
    const { frontMatter, title } = useConfig()
    
    return (
      <>
        <title>{title ? `${title} – HashTral` : 'HashTral'}</title>
        <meta name="description" content={frontMatter.description || 'HashTral - Guia completo sobre criptomoedas'} />
      </>
    )
  },
  
  // Disable the feedback link
  feedback: {
    content: null
  },
  
  // Disable the edit link
  editLink: {
    component: null
  },
  
  // Add custom sidebar footer with your ad
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  
  // This targets the TOC (Table of Contents) sidebar on the right
  toc: {
    extraContent: () => (
      <div style={{ 
        textAlign: 'center', 
        padding: '1rem',
        marginTop: '0',
        borderTop: '1px solid #eaeaea'
      }}>
        <img 
          src="/oferecimento_coins.jpg" 
          alt="Advertisement" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            marginBottom: '1rem'
          }} 
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Abra sua conta na{' '}
          <a 
            href="https://www.coins.xyz/en/register?invite_code=2000647282118095360&broker=9010"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0070f3', textDecoration: 'underline' }}
          >
            Coins.xyz
          </a>
          — Ganhe 5 USDT
        </p>
      </div>
    )
  },
  
  footer: {
    text: 'HashTral © 2025',
  },
  
  components: {
    FloatImage
  }
}

export default config
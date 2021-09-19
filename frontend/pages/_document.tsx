import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
<meta name="description" content="" />
<meta property="og:title" content="" />
<meta
  property="og:description"
  content=""
/>
<meta name="keywords" content="" />
<meta property="og:type" content="blog" />
<meta property="og:url" content="" />
<meta
  property="og:image"
  content="http://localhost:80/users/1/image"
/>
<meta property="og:site_name" content="" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@tcr_jp" />
<meta name="twitter:url" content="" />
<meta name="twitter:title" content="" />
<meta name="twitter:text:title" content="test" />
<meta
  name="twitter:description"
  content=''
/>
<meta
  name="twitter:image"
  content=""
/>
<link rel="canonical" href="" />
<link
  rel="icon"
  href=""
/>
<link
  rel="shortcut icon"
  href={
    ''
  }
/>
<link
  rel="apple-touch-icon"
  href={
    ''
  }
/>
</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
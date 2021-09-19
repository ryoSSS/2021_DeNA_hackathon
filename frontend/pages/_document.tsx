import { GetServerSideProps } from 'next'
import { DocumentInitialProps, loadGetInitialProps } from 'next/dist/shared/lib/utils'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import internal from 'stream'

interface Props{
  initialProps?: DocumentInitialProps;
  id: number;
}

class MyDocument extends Document<Props>{
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { id } = ctx.query;
   
    return { ...initialProps,id}
  }

  render() {
    const {id} = this.props
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
            content={"http://localhost:80/users/"+id +"/image"}
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



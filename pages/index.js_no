import * as React from 'react';
import { getCobaltPageByUrl } from '../src/lib/cobalt-cms/cobalt-api';
import Layout from '../src/components/Layout/Layout';
import LandingPage from '../src/components/Page/LandingPage';

export default function Index({ cobaltData }) {
  return (
    <Layout siteStructure={cobaltData.siteContext.siteStructure}>
      <LandingPage cobaltData={cobaltData}/>
    </Layout>
  );
}

export async function getStaticProps(context){
  console.log('RENDERING: /');
  let cobaltData = null;
 
  cobaltData = await getCobaltPageByUrl('/',null);
  
  // console.log(cobaltData)
  return {
      props: {
          cobaltData
      },
      revalidate: 5
  }
}

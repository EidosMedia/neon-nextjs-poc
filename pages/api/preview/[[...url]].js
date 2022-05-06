export default async (req, res) => {
    console.log("--- PREVIEW DATA ---")
    console.log(req.query)
    // Enable Preview Mode by setting the cookies
    res.setPreviewData(req.query)
    
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect('/preview')
  }
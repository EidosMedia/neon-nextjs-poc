export default async (req, res) => {
    console.log("--- PREVIEW URL ---")
    console.log(req.query.previewUrl)
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        previewUrl: req.query.previewUrl
    })
    
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect('/preview')
  }
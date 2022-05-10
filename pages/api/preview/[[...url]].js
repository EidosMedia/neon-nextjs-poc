export default async (req, res) => {
    console.log("--- PREVIEW DATA ---")
    console.log(req.query)
    // Enable Preview Mode by setting the cookies
    res.setPreviewData(req.query)
    // Redirect to the path from the fetched post
    const redirectUrl = req.query.url.join('/');
    res.redirect('/'+redirectUrl)
  }
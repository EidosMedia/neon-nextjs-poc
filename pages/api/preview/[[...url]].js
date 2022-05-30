export default async (req, res) => {
    console.log("--- PREVIEW DATA ---")
    console.log(req.query)
    // Enable Preview Mode by setting the cookies
    res.setPreviewData(req.query, {maxAge: 10})
    // Redirect to the path from the fetched post
    const redirectUrl = req.query.url.join('/');
    res.redirect('/'+redirectUrl)
  }
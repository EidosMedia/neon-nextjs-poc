

export default async (req, res) => {
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({...req.query, emauth: req.cookies.emauth});
    // Redirect to the path from the fetched post
    const redirectUrl = req.query.url.join('/');
    res.redirect(`/${redirectUrl}`);
};

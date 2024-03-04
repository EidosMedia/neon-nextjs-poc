export default async (req, res) => {
    console.log('--- PREVIEW DATA ---');
    // Enable Preview Mode by setting the cookies
    res.setPreviewData(req.query, { maxAge: 60 });
    // Redirect to the path from the fetched post
    const redirectUrl = req.query.url.join('/');
    res.redirect(`/${redirectUrl}`);
};

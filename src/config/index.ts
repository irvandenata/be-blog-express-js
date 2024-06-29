var API_URL: string,
    CLIENT_URL: string;

if (process.env.NODE_ENV === 'production') {
    API_URL = process.env.API_URL_PROD as string;
    CLIENT_URL = process.env.CLIENT_URL_PROD as string;
} else if (process.env.NODE_ENV === 'test') {
    API_URL = process.env.API_URL_TEST as string;
    CLIENT_URL = process.env.CLIENT_URL_TEST as string;
} else {
    API_URL = "http://localhost:" + process.env.PORT as string;
    CLIENT_URL = process.env.CLIENT_URL_DEV as string;
};

export { API_URL, CLIENT_URL }
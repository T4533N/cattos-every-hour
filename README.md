<div align="center">

<h1> Cattos Every Hour </h1>

  <p> A GitHub Action which posts a picture of a Cat to Twitter every hour.</p> 
  
</div>

# Developing Locally

1. Clone this repo to your machine.

2. Create a `.env` in the root directory.

3. Inside the `.env` you will need to create four variables. `CONSUMER_KEY` , `CONSUMER_SECRET`, `ACCESS_TOKEN_KEY` and `ACCESS_TOKEN_SECRET`. These need to be populated with your own Twitter API keys which you can get by signing up at https://developer.twitter.com/ .

4. Your `.env` file should look something like this.

```
CONSUMER_KEY = hvdVM7ZGshibasaresogreat3ZvE5tXh0E4h
CONSUMER_SECRET = 4ez9dEyAeGtbnXeca-ha-ha-M0i5wI02e1vPa
ACCESS_TOKEN_KEY = 8185583706135142-not-a-real-key-gPwxau3Yi0adA
ACCESS_TOKEN_SECRET = wow-fsaa2muchwoof
```

5. You can then run `npm run dev-shibe` to run the script locally.

# Modifying the Action or Script

Feel free to adapt this script for your own purposes.

The hourly schedule is configured in `./.github/workflows/post-shibe.yml`.

All the logic to fetch a Shiba image and post to Twitter is in `./index.js`.

# Publishing to Github

> ⚠ Do NOT publish your `.env` to GitHub. Doing this will let anyone send posts to your Twitter account on your behalf.

1. Add your Twitter API as [GitHub secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) like so:

![Screenshot of GitHub Secrets with `CONSUMER_KEY`,`CONSUMER_SECRET`, `ACCESS_TOKEN_KEY` and `ACCESS_TOKEN_SECRET`](https://user-images.githubusercontent.com/18376481/90680314-95b73500-e259-11ea-8b06-75067520cefc.PNG)

Happy hacking 🤓.

<?php 
  require "header.php"
 ?>
<!DOCTYPE html>
<!-- saved from url=(0053)https://developers.google.com/events/flutter-interact -->
<html lang="en" dir="ltr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        body {transition: opacity ease-in 0.2s; } 
        body[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; }
    </style>
    <meta name="google-signin-client-id" content="721724668570-nbkv1cfusk7kk4eni4pjvepaus73b13t.apps.googleusercontent.com">
    <meta name="google-signin-scope" content="profile email">
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="https://developers.google.com/_pwa/developers/manifest.json" crossorigin="use-credentials">
    <link rel="preconnect" href="https://www.gstatic.com/" crossorigin="">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
    <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin="">
    <link rel="stylesheet" href="./Flutter Interact  _  Google Developers_files/css">
    <link rel="stylesheet" href="./Flutter Interact  _  Google Developers_files/app.css">
    <noscript>
        <link rel="stylesheet" href="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/css/ce_bundle.css">
    </noscript>
    <link rel="shortcut icon" href="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/images/favicon.png">
    <link rel="apple-touch-icon" href="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/images/touchicon-180.png">
    <link rel="canonical" href="https://developers.google.com/events/flutter-interact">
    <link rel="search" type="application/opensearchdescription+xml" href="https://developers.google.com/s/opensearch.xml" data-title="Google Developers">
    <title>Flutter Interact &nbsp;|&nbsp; Google Developers</title>
    <meta name="description" content="Join us for a day of creation and collaboration with the world, broadcasted live from Brooklyn NY.">
    <meta name="xsrf_token" content="LgJqyVxY2Y4Pd40L51KEffzALW_ocXkF7E77XOpRJpY6MTU3MzY2MTc5MTEzMjQ3Ng">

    <script async="" type="text/javascript" charset="UTF-8" src="./Flutter Interact  _  Google Developers_files/rs=AA2YrTsmtLbcGS1896f3zk0JqfFC69ja_Q"></script>
    <link type="text/css" rel="stylesheet" href="./Flutter Interact  _  Google Developers_files/rs=AA2YrTtQZo3IwTo2UdJKvCrfbOVhyCYmcQ">
    <script type="text/javascript" charset="UTF-8" src="./Flutter Interact  _  Google Developers_files/_9qqzSerqiaXBca7x3PbLBiyYIXtyHu7e-vkz-tsqts.js.download"></script>
    <script src="./Flutter Interact  _  Google Developers_files/devsite_heading_module.js.download"></script>
    <link rel="stylesheet" type="text/css" href="./Flutter Interact  _  Google Developers_files/devsite_heading.css">
    <script src="./Flutter Interact  _  Google Developers_files/devsite_iframe_module.js.download"></script>
    <link rel="stylesheet" type="text/css" href="./Flutter Interact  _  Google Developers_files/devsite_iframe.css">
    <script src="./Flutter Interact  _  Google Developers_files/devsite_snackbar_module.js.download"></script>
    <link rel="stylesheet" type="text/css" href="./Flutter Interact  _  Google Developers_files/devsite_snackbar.css">
    <script src="./Flutter Interact  _  Google Developers_files/devsite_tooltip_module.js.download"></script>
    <link rel="stylesheet" type="text/css" href="./Flutter Interact  _  Google Developers_files/devsite_tooltip.css">
    <script src="./Flutter Interact  _  Google Developers_files/devsite_youtube_module.js.download"></script>
    <link rel="stylesheet" type="text/css" href="./Flutter Interact  _  Google Developers_files/devsite_youtube.css">
    <script src="./Flutter Interact  _  Google Developers_files/iframe_api"></script>
    <meta property="og:title" content="Flutter Interact  |  Google Developers">
    <meta property="og:description" content="Join us for a day of creation and collaboration with the world, broadcasted live from Brooklyn NY.">
    <meta property="og:url" content="https://developers.google.com/events/flutter-interact">
    <meta property="og:image" content="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/images/opengraph/google-blue.png">
    <meta property="og:image:secure_url" content="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/images/opengraph/google-blue.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="675">
    <meta property="og:locale" content="en">
    <meta name="twitter:card" content="summary_large_image">
</head>

<body type="landing" theme="google-blue" class="flutter-interact" layout="full" ready="" cz-shortcut-listen="true">
    <devsite-progress id="app-progress"></devsite-progress>
    <div class="devsite-wrapper">
        <div class="devsite-book-nav-bg" hidden="" fixed=""></div>
        <div id="gc-wrapper" style="margin-top: 48px;">
            <div class="devsite-main-content">
                <devsite-toc class="devsite-nav" hidden=""></devsite-toc>
                <devsite-content>
                    <article class="devsite-article">
                        <article class="devsite-article-inner">
                            <style type="text/css">
                                /* Common event styles */
                                @import url("/site-assets/styles/events.css");
                                
                                h1, h2, h3, h4, h5, h6 {
                                  font-family: 'Google Sans', sans-serif;
                                }
                                
                                .flutter-interact {
                                }
                                
                                .flutter-interact .fi-section {
                                  padding: 64px 0 24px;
                                }
                                
                                .flutter-interact .fi-section--hero {
                                  background-color: #112332;
                                  background-image: url(/events/flutter-interact/images/hero_texture.svg);
                                  background-position: center;
                                  background-repeat: no-repeat;
                                  background-size: cover;
                                  color: #fff;
                                }
                                
                                .flutter-interact .fi-section--dark {
                                  background-color: #112332;
                                  color: #fff;
                                }
                                
                                .flutter-interact .fi-col h3 {
                                  font-family: 'Google Sans';
                                }
                                
                                .flutter-interact .fi-col--25 {
                                  flex: 25%;
                                }
                                
                                .flutter-interact .fi-col--75 {
                                  flex: 75%;
                                }
                                
                                .flutter-interact .fi-col--40 {
                                  flex: 40%;
                                }
                                
                                .flutter-interact .fi-col--60 {
                                  flex: 60%;
                                }
                                
                                .flutter-interact .fi-col--30 {
                                  flex: 30%;
                                }
                                
                                .flutter-interact .fi-col--70 {
                                  flex: 70%;
                                }
                                
                                /* DevSite Overrides */
                                .flutter-interact .devsite-footer,
                                .flutter-interact .devsite-footer .devsite-footer-utility,
                                .flutter-interact .devsite-footer .devsite-footer-linkboxes {
                                  background-color: #F8F9FA;
                                }
                                                              
                                .flutter-interact
                                .devsite-landing-row:not(.devsite-landing-row-4-up)
                                .devsite-landing-row-item-no-media:not(:first-child) {
                                  margin: 0;
                                }
                                
                                .flutter-interact [background=white] :link:not(.button),
                                [background=white] :visited:not(.button) {
                                  color: #1a73e8;
                                  outline: 0;
                                  text-decoration: none;
                                }
                                
                                .flutter-interact .devsite-landing-row-header {
                                  margin-bottom: 0;
                                }
                                
                                /* Schedule styles */
                                .flutter-interact .fi-schedule-table {
                                  padding: 46px;
                                }
                                
                                .flutter-interact .fi-schedule-table table {
                                  font-size: 18px;
                                }
                                
                                /* DevSite Override for Schedule */
                                .flutter-interact .fi-schedule-table
                                table.responsive>*>tr:not(.alt) td:first-child,
                                table.responsive>tr:not(.alt) td:first-child {
                                  background: transparent;
                                }
                                
                                .flutter-interact .fi-schedule-table tr {
                                  border: 0;
                                  border-bottom: 1px solid #dadce0;
                                }
                                
                                .flutter-interact .fi-schedule-table tr:last-of-type {
                                  border: 0;
                                }
                                
                                .flutter-interact .fi-schedule-table td {
                                  padding: 32px 0;
                                }
                                
                                .flutter-interact .fi-schedule-table h3 {
                                  font-family: 'Google Sans';
                                  font-size: 20px;
                                  line-height: 28px;
                                  font-weight: normal;
                                }
                                
                                .flutter-interact .fi-schedule-table td:first-of-type {
                                  width: 25%;
                                }
                                
                                .flutter-interact .fi-schedule-table small {
                                  font-size: 14px;
                                }
                                
                                .flutter-interact .fi-schedule-table p+p {
                                  color: #4C5257;
                                }
                                
                                .flutter-interact .fi-schedule-table .fi-speaker-name {
                                  font-size: 16px;
                                }
                                
                                .flutter-interact .fi-schedule-table .fi-schedule-description {
                                  font-size: 14px;
                                }
                                
                                .flutter-interact .fi-schedule-table-note {
                                  padding: 2em 0;
                                  text-align: right;
                                }
                                
                                .flutter-interact .fi-schedule-table-note {
                                  font-family: 'Google Sans';
                                  font-size: 12px;
                                  line-height: 18px;
                                  letter-spacing: 0.35;
                                }
                                
                                /* Hero styles (video) */
                                .flutter-interact .fi-landing-hero .devsite-landing-row-item-media {
                                  flex-basis: 50%;
                                }
                                
                                .flutter-interact .fi-landing-hero .devsite-landing-row-item-buttons {
                                  margin-top: 1em;
                                }
                                
                                .flutter-interact .fi-landing-hero .button-arrow {
                                  color: #fff;
                                }
                                
                                /* Home cards */
                                .flutter-interact .fi-cards h2 {
                                  margin-left: auto;
                                  margin-right: auto;
                                  text-align: center;
                                  width: 82.5%;
                                }
                                
                                .flutter-interact .fi-cards .devsite-landing-row-item {
                                  border-radius: 0;
                                  border: none;
                                }
                                
                                .flutter-interact .fi-cards .devsite-landing-row-item-buttons {
                                  align-items: start;
                                  flex-flow: column;
                                  margin-top: 0;
                                }
                                
                                /* Attending styles */
                                .flutter-interact .fi-attending-col ul {
                                  margin: 0;
                                  padding-left: 20px;
                                }
                                
                                .flutter-interact .fi-attending-col h4 {
                                  color: #91979C;
                                  margin: 32px 0 0;
                                }
                                
                                .flutter-interact .fi-attending-col p {
                                  margin: 0 0 16px;
                                }
                                
                                .flutter-interact .fi-attending-header h2 {
                                  width: 100%;
                                }
                                
                                @media (min-width: 1440px) {
                                  .flutter-interact .fi-section--hero {
                                    background-size: auto;
                                  }
                                }
                                
                                /* Speakers styles */
                                .flutter-interact .fi-speakers h4 {
                                  color: #91979C;
                                }
                                
                                
                                /* Buttons */
                                .flutter-interact .button-arrow {
                                  background: transparent;
                                  border: none;
                                  height: auto;
                                  line-height: 1.35;
                                  padding: 4px 8px 5px;
                                }
                                
                                .flutter-interact .button-arrow:after {
                                  color: inherit;
                                  content: '\2192';
                                  display: inline-block;
                                  margin-left: 6px;
                                  transform: translateY(1px);
                                }
                                
                                .flutter-interact .button-arrow:focus {
                                  text-decoration: underline;
                                }
                                
                                /* Heading one */
                                .fi-heading-one,
                                .flutter-interact .fi-landing-hero h3 {
                                  font-size: 32px;
                                  line-height: 72px;
                                  margin-bottom: .35em;
                                }
                                
                                /* Heading two */
                                .fi-heading-two,
                                .flutter-interact .fi-section--hero h2,
                                .flutter-interact .fi-get-involved h2 {
                                  font-size: 38px;
                                  line-height: 1.2;
                                  margin: 0 0 .25em;
                                }
                                
                                /* Heading description */
                                .fi-heading-description,
                                .flutter-interact .fi-section--hero .devsite-landing-row-description,
                                .flutter-interact .fi-landing-hero .devsite-landing-row-item-description-content {
                                  font-family: 'Google Sans', sans-serif;
                                  font-size: 16px;
                                  line-height: 32px;
                                }
                                
                                /* Media queries */
                                @media (min-width: 350px) {
                                  .flutter-interact .fi-section {
                                    padding: 40px 0 24px;
                                  }
                                }
                                
                                @media (min-width: 600px) {
                                  /* Heading one */
                                  .fi-heading-one,
                                  .flutter-interact .fi-landing-hero h3 {
                                    font-size: 38px;
                                    letter-spacing: 0;
                                  }
                                
                                   /* Heading two */
                                  .fi-heading-two,
                                  .flutter-interact .fi-section--hero h2,
                                  .flutter-interact .fi-get-involved h2 {
                                    font-size: 45px;
                                  }
                                
                                  /* Heading description */
                                  .fi-heading-description,
                                  .flutter-interact .fi-section--hero .devsite-landing-row-description,
                                  .flutter-interact .fi-landing-hero .devsite-landing-row-item-description-content {
                                    font-size: 16px;
                                    letter-spacing: 0;
                                  }
                                
                                  .flutter-interact .fi-landing-hero .devsite-landing-row-item-description {
                                    padding-right: 100px;
                                  }
                                
                                  .flutter-interact .fi-get-involved .devsite-landing-row-column {
                                    align-self: center;
                                    margin-left: 1em;
                                    margin-right: 1em;
                                  }
                                
                                  .flutter-interact .fi-attending-header h2 {
                                    width: 90%;
                                  }
                                
                                  .flutter-interact .fi-section {
                                    padding: 80px 0 40px;
                                  }
                                
                                  .flutter-interact .fi-schedule-table h3 {
                                    font-size: 24px;
                                    line-height: 32px;
                                  }
                                }
                                
                                @media (min-width: 1000px) {
                                  /* Heading one */
                                  .fi-heading-one,
                                  .flutter-interact .fi-landing-hero h3 {
                                    font-size: 64px;
                                  }
                                
                                  /* Heading two */
                                  .fi-heading-two,
                                  .flutter-interact .fi-section--hero h2,
                                  .flutter-interact .fi-get-involved h2 {
                                    font-size: 56px;
                                  }
                                
                                  /* Heading description */
                                  .fi-heading-description,
                                  .flutter-interact .fi-section--hero .devsite-landing-row-description,
                                  .flutter-interact .fi-landing-hero .devsite-landing-row-item-description-content {
                                    font-size: 24px;
                                    width: 70%;
                                  }
                                
                                  .flutter-interact .fi-section {
                                    padding: 80px 0 80px;
                                  }
                                
                                  .flutter-interact .fi-attending-header h2 {
                                    width: 60%;
                                  }
                                
                                  .flutter-interact .fi-schedule-table h3 {
                                    font-size: 32px;
                                    line-height: 40px;
                                  }
                                }
                            </style>
                            <div class="devsite-article-body clearfix
              devsite-no-page-title" style="position: relative; top: 45px;">
                                <section class="devsite-landing-row devsite-landing-row-1-up devsite-landing-row-large-headings devsite-landing-row-marquee fi-section fi-section--hero fi-landing-hero">
                                    <div class="devsite-landing-row-group">
                                        <div class="devsite-landing-row-item">
                                            <div class="devsite-landing-row-item-media
            ">
                                                <devsite-youtube autohide="1" showinfo="0" video-id="UblwHW6Lgc4" tabindex="0" aria-label="You are currently on an element that contains a YouTube video titled: Announcing Flutter Interact. Continue tabbing to hear the contained options.">
                                                    <iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" width="640" height="360" src="./Flutter Interact  _  Google Developers_files/UblwHW6Lgc4.html" id="widget4" data-title="YouTube video player"></iframe>
                                                </devsite-youtube>
                                            </div>
                                            <div class="devsite-landing-row-item-description">
                                                <div class="devsite-landing-row-item-body">
                                                    <devsite-heading text="Flutter Interact ‘19" for="flutter-interactnbsp19" level="h3" toc="">
                                                        <h3 id="flutter-interactnbsp19" is-upgraded="">
      Flutter Interact&nbsp;‘19
</h3>
                                                    </devsite-heading>
                                                    <div class="devsite-landing-row-item-description-content">On December 14, interact, innovate and collaborate with the global community. Streaming live around the globe.</div>
                                                    <div class="devsite-landing-row-item-buttons"> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfoiVftAR8hbMgVwvYOiWls_TfBCUR69Q027uDRE9PUAnQ7nA/viewform" class="button button-primary
      " target="_blank" rel="noopener noreferrer">Sign up for updates</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="devsite-landing-row devsite-landing-row-3-up devsite-landing-row-cards fi-section fi-cards" background="white">
                                    <header class="devsite-landing-row-header">
                                        <div class="devsite-landing-row-header-text">
                                            <devsite-heading text="Flutter Interact is a day dedicated to creation and collaboration with the world, inspired by the makers of brilliant experiences." for="flutter-interact-is-a-day-dedicated-to-creation-and-collaboration-with-the-world-inspired-by-the-makers-of-brilliant-experiences" level="h2" toc="">
                                                <h2 id="flutter-interact-is-a-day-dedicated-to-creation-and-collaboration-with-the-world-inspired-by-the-makers-of-brilliant-experiences" is-upgraded="">
      Flutter Interact is a day dedicated to creation and collaboration with the world, inspired by the makers of brilliant experiences.
</h2>
                                            </devsite-heading>
                                        </div>
                                    </header>
                                   
                                    </div>
                                </section>
                                <section class="devsite-landing-row devsite-landing-row-2-up fi-section fi-section--dark fi-get-involved">
                                    <div class="devsite-landing-row-group">
                                        <div class="devsite-landing-row-column">
                                            <devsite-heading text="Get involved" for="get-involved" level="h2" toc="">
                                                <h2 id="get-involved" is-upgraded="">
      Get involved</h2>
                                            </devsite-heading>
                                            <div class="devsite-landing-row-description">
                                                <p>From showing up in-person to joining a viewing party to sharing your Flutter success story with the world, there are many ways to get involved.</p>
                                                <p>Official hashtag: <a href="https://twitter.com/hashtag/FlutterInteract?lang=en" target="_blank" rel="noopener noreferrer">#FlutterInteract</a>
                                                    <br>Questions: <a href="https://twitter.com/hashtag/AskFlutter?lang=en" target="_blank" rel="noopener noreferrer">#AskFlutter</a>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="devsite-landing-row-column">
                                            <div class="devsite-landing-row-item">
                                                <devsite-iframe class="" height="706px" style="height: 706px;">
                                                    <iframe src="./Flutter Interact  _  Google Developers_files/index_8006e25161af9a6385ae8b6019e42b30e59283dba1e06839dc291b08880d02b3.html" allowfullscreen="" name="goog_642224841"></iframe>
                                                </devsite-iframe>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </article>
                    </article>
                </devsite-content>
            </div>
        </div>
    </div>

</body>

</html>
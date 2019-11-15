<?php require "header.php" ?>
<!doctype html>
<html lang="en" dir="ltr">

<head>
  <link rel="stylesheet" href="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/css/app.css">
  <noscript>
    <link rel="stylesheet" href="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/css/ce_bundle.css">
  </noscript>
  <link rel="apple-touch-icon" href="https://www.gstatic.com/devrel-devsite/prod/v98dba58d370055a75e2a5d5d215c4ecfda28b813705f75c7e2758703570175e1/developers/images/touchicon-180.png">
  <link rel="canonical" href="https://developers.google.com/events/flutter-interact/community-guidelines">
  <link rel="search" type="application/opensearchdescription+xml" title="Google Developers" href="https://developers.google.com/s/opensearch.xml">
  <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700|Material+Icons">

  <title>Flutter Interact &nbsp;|&nbsp; Google Developers</title>
</head>
<devsite-book-nav scrollbars hidden>
  <nav class="devsite-book-nav devsite-nav nocontent">
    <div class="devsite-mobile-header">
      <button type="button" id="devsite-close-nav" class="devsite-header-icon-button button-flat material-icons gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Close navigation" aria-label="Close navigation"></button>
      <div class="devsite-product-name-wrapper">
        <a href="/events/flutter-interact">
          <div class="devsite-product-logo-container">
            <img class="devsite-product-logo" alt="Flutter Interact" src="/events/flutter-interact/images/flutter-icon.png" srcset="/events/flutter-interact/images/flutter-icon_36.png 36w, /events/flutter-interact/images/flutter-icon_48.png 48w, /events/flutter-interact/images/flutter-icon_72.png 72w, /events/flutter-interact/images/flutter-icon_96.png 96w, /events/flutter-interact/images/flutter-icon_480.png 480w, /events/flutter-interact/images/flutter-icon_720.png 720w, /events/flutter-interact/images/flutter-icon_856.png 856w, /events/flutter-interact/images/flutter-icon_960.png 960w, /events/flutter-interact/images/flutter-icon_1440.png 1440w, /events/flutter-interact/images/flutter-icon_1920.png 1920w, /events/flutter-interact/images/flutter-icon_2880.png 2880w" sizes="64px">
          </div>
        </a>
      </div>
    </div>
  </nav>
</devsite-book-nav>
<div id="gc-wrapper">
  <div class="devsite-main-content">
    <devsite-toc class="devsite-nav" hidden></devsite-toc>
    <devsite-content>
      <article class="devsite-article">
        <article class="devsite-article-inner"><style type="text/css">/* Common event styles */

h1, h2, h3, h4, h5, h6 {
font-family: 'Google Sans', sans-serif;
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

          <devsite-toc class="devsite-nav" devsite-toc-embedded hidden></devsite-toc>
          <div class="devsite-article-body clearfix devsite-no-page-title" style="position: relative; top: 82px;">
            <section class="devsite-landing-row devsite-landing-row-1-up fi-section">
              <header class="devsite-landing-row-header">
                <div class="devsite-landing-row-header-text">
                  <h2 id="google-event-community-guidelines-and-anti-harassment-policy">
      Google Event Community Guidelines and Anti-Harassment Policy</h2>
                  <div class="devsite-landing-row-description">Google is dedicated to providing a harassment-free and inclusive event experience for everyone regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category. We do not tolerate harassment of event participants in any form. Google takes violations of our policy seriously and will respond appropriately. For more information on Google’s Event Community Guidelines and Anti-Harassment Policy, please see <a href="https://www.google.com/events/policy/anti-harassmentpolicy.html" rel="noopener noreferrer" target="_blank">here</a>.</div>
                </div>
              </header>
            </section>
            <section class="devsite-landing-row devsite-landing-row-3-up fi-section" background="grey">
              <header class="devsite-landing-row-header">
                <div class="devsite-landing-row-header-text">
                  <h2 id="all-participants-of-google-events-must-abide-by-the-following-policy">
      All participants of Google events must abide by the following policy:
</h2>
                </div>
              </header>
              <div class="devsite-landing-row-group">
                <div class="devsite-landing-row-column">
                  <div class="devsite-landing-row-item devsite-landing-row-item-no-media">
                    <div class="devsite-landing-row-item-description">
                      <div class="devsite-landing-row-item-body">
                        <h3 id="be-excellent-to-each-other">
      Be excellent to each other.</h3>
                        <div class="devsite-landing-row-item-description-content">Treat everyone with respect. Participate while acknowledging that everyone deserves to be here — and each of us has the right to enjoy our experience without fear of harassment, discrimination, or condescension, whether blatant or via micro-aggressions. Jokes shouldn’t demean others. Consider what you are saying and how you would feel if it were said to or about you.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="devsite-landing-row-column">
                  <div class="devsite-landing-row-item devsite-landing-row-item-no-media">
                    <div class="devsite-landing-row-item-description">
                      <div class="devsite-landing-row-item-body">
                        <h3 id="speak-up-if-you-see-or-hear-something">
      Speak up if you see or hear something.</h3>
                        <div class="devsite-landing-row-item-description-content">Harassment is not tolerated, and you are empowered to politely engage when you or others are disrespected. The person making you feel uncomfortable may not be aware of what they are doing, and politely bringing their behavior to their attention is encouraged.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="devsite-landing-row-column">
                  <div class="devsite-landing-row-item devsite-landing-row-item-no-media">
                    <div class="devsite-landing-row-item-description">
                      <div class="devsite-landing-row-item-body">
                        <h3 id="practice-saying-yes-and-to-each-other">
      Practice saying "Yes and" to each other.</h3>
                        <div class="devsite-landing-row-item-description-content">It’s a theatre improv technique to build on each other’s ideas. We all benefit when we create together.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="devsite-landing-row devsite-landing-row-2-up fi-section">
              <header class="devsite-landing-row-header">
                <div class="devsite-landing-row-header-text">
                  <h2 id="zero-tolerance-policy-for-harassment-of-any-kind">
      ZERO-TOLERANCE POLICY for harassment of any kind.</h2>
                </div>
              </header>
              <div class="devsite-landing-row-group">
                <div class="devsite-landing-row-column">
                  <div class="devsite-landing-row-description">
                    <p>Including, but not limited to:</p>
                    <ul>
                      <li>Stalking/following</li>
                      <li>Deliberate intimidation</li>
                      <li>Harassing photography or recording</li>
                      <li>Sustained disruption of talks or other events</li>
                      <li>Offensive verbal language</li>
                      <li>Verbal language that reinforces social structures of domination</li>
                      <li>Sexual imagery and language in public spaces</li>
                      <li>Inappropriate physical contact</li>
                      <li>Unwelcome sexual or physical attention</li>
                    </ul>
                  </div>
                </div>
                <div class="devsite-landing-row-column">
                  <div class="devsite-landing-row-description">
                    <p>In relation, but not limited to:</p>
                    <ul>
                      <li>Neurodiversity</li>
                      <li>Race</li>
                      <li>Color</li>
                      <li>National origin</li>
                      <li>Gender identity</li>
                      <li>Gender expression</li>
                      <li>Sexual orientation</li>
                      <li>Age</li>
                      <li>Body size</li>
                      <li>Disabilities</li>
                      <li>Appearance</li>
                      <li>Religion</li>
                      <li>Pregnancy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section class="devsite-landing-row devsite-landing-row-1-up">
              <header class="devsite-landing-row-header">
                <div class="devsite-landing-row-header-text">
                  <div class="devsite-landing-row-description">
                    <p>Participants asked to stop any harassing behavior are expected to comply immediately. Our zero-tolerance policy means that we will look into and review every allegation of violation of our Event Community Guidelines and Anti-Harassment Policy and respond appropriately. We empower and encourage you to report any behavior that makes you or others feel uncomfortable by finding a Google staff member wearing a STAFF shirt or by emailing <a href="mailto:flutter-interact-community@google.com" target="_blank" rel="noopener noreferrer">flutter-interact-community@google.com</a>.</p>
                    <p>Event staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing discomfort or harassment to feel safe for the duration of the event. We value your attendance.</p>
                    <p>This policy extends to talks, forums, workshops, codelabs, social media, parties, hallway conversations, all attendees, partners, sponsors, volunteers, event staff, etc. You catch our drift.</p>
                    <p>Google reserves the right to refuse admittance to, or remove any person from, any Google hosted event (including future Google events) at any time in its sole discretion. This includes, but is not limited to, attendees behaving in a disorderly manner or failing to comply with this policy, and the terms and conditions herein. If a participant engages in harassing or uncomfortable behavior, the conference organizers may take any action they deem appropriate, including warning or expelling the offender from the conference with no refund.</p>
                  </div>
                </div>
              </header>
            </section>
          </div>
        </article>
      </article>
    </devsite-content>
  </div>
  </devsite-footer-utility>
</div>
</div>
</body>

</html>
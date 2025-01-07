'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('legal');

  useEffect(() => {
    if (locale === 'en') {
      router.replace(`/${locale}/privacy-policy`);
      return;
    }
  }, [router, locale]);

  if (locale === 'en') {
    return null;
  }

  return (
    <div className='container mx-auto px-4 mt-24 md:px-20 lg:px-24 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Gizlilik ve Çerez Politikası</h1>
      <p className='text-sm text-gray-600 mb-8'>
        {t('lastUpdated')}: {t('termsLastUpdated')}
      </p>
      <div className='prose max-w-none space-y-4'>
        <p>
          JellyArcade is the intant (browser) gaming project of CB CONS d.o.o.
          registration no. 03588360 organized and existing under the laws of
          Montenegro], having its principial place of business at Palih Boraca
          14, Tivat - Montenegro. (hereinafter referred to as “Company”);
          Company aims to serve games in online accessible way (hereinafter
          reffered to as “Platform”). Players can access Platform with or
          without an account (hereinafter reffered to as “Account”). Platorform
          is available via one of JellayArcade’s Companybsites as visible in the
          address bar (hereinafter reffered to as “Website”).
        </p>
        <p>
          Company recognize the trust you place in us and take our
          responsibility to protect your privacy seriously. This Privacy Policy
          (this “Policy”) provides important details about how Company collect,
          process, disclose, retain, and protect your personal data. Please
          review it carefully to understand your rights and our obligations
          regarding your information.
        </p>
        <p>
          The Platform is intended for visitors and users who are thirteen (13)
          years of age (or the applicable minimum age in your country) or older.
          If you are under thirteen (13) years of age (or the applicable minimum
          age in your country), this Platform is not intended for you. Company
          do not knowingly collect or solicit personal information from children
          under the age of thirteen (13) (or the applicable minimum age in your
          country) through our Platform.
        </p>
        <p>
          For information about the terms upon which Company do business, you
          should also read our{' '}
          <Link href={`/${locale}/terms-of-service`}>Terms of Service</Link>.
        </p>
        <p>
          Personal Data is any information about you that allows us to identify
          you. This could be, for example, your name or email address. But
          equally data about the games you played if Company can link it to your
          account on our Platform (“Account”) .
        </p>
        <p className='font-bold'>
          Company strongly recommends not to use your real name or share any
          other personal data in any of the games provided on our Platform
          including, without limitation, when engaging in multiplayer.
        </p>
        <p>
          In order to operate our Platform, Company may collect data from users
          and visitors of the Platform and website, developers of web games,
          persons who otherwise provide us with their contact details, and
          persons who contact us by email or other means. As described above
          under article 1.3, Company do collect personal data from children
          older than the age of thirteen (13) or the applicable minimum age in
          your country.
        </p>
        <p>Company may collect the following Personal Data of you:</p>
        <p className='font-bold'>
          To register and authenticate your Account of the Platform
        </p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: email address, name, age, gender external
            account, username and password
          </li>
          <li>
            On what basis: The prior, express, free, specific and
            informed consent of you
          </li>
        </ul>
        <p className='font-bold'>
          Personalisation of your game experience (Account)
        </p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: username, device and connection data, selected
            interests, gaming behaviour and feedback
          </li>
          <li>
            On what basis: The prior, express, free, specific and
            informed consent of you
          </li>
        </ul>
        <p className='font-bold'>
          To respond to your question or complaint, or to help you with
          technical problems
        </p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: name, e-mail address and other information that
            you provide to us
          </li>
          <li>
            On what basis: Necessary for the exercise of our legitimate
            interests, in particular to enhance the quality of our Platform
          </li>
        </ul>
        <p className='font-bold'>
          To inform you of new functionalities of our Platform
        </p>
        <ul className='list-disc list-inside'>
          <li>Which personal data: username and email address</li>
          <li>
            On what basis: Necessary for the exercise of our legitimate
            interests, in particular to communicate relevant information about
            our Platform
          </li>
        </ul>
        <p className='font-bold'>
          To analyse statistics about visitors to our Platform and games in
          order to improve the Platform, the games and user experience
        </p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: data on visitors' behaviour (usage & device
            data) and in-game statistics
          </li>
          <li>
            On what basis: Necessary for the exercise of our legitimate
            interests, in particular collecting statistics about the usage and
            performance of our Platform and the games
          </li>
        </ul>
        <p className='font-bold'>To comply with legal obligations</p>
        <ul className='list-disc list-inside'>
          <li>Which personal data: data required by applicable law</li>
          <li>On what basis: Necessary to comply with a legal obligation</li>
        </ul>
        <p className='font-bold'>
          To prevent, detect and combat fraud and other illegal or unauthorised
          activities
        </p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: data required for detection of fraud and
            illegal activities
          </li>
          <li>
            On what basis: Necessary for the exercise of our legitimate
            interests, in particular the prevention of fraud and other illegal
            activities
          </li>
        </ul>
        <p className='font-bold'>
          For marketing of CrazyGames (for example newsletters)
        </p>
        <ul className='list-disc list-inside'>
          <li>Which personal data: username and email address</li>
          <li>
            On what basis: The prior, express, free, specific and
            informed consent of you
          </li>
        </ul>
        <p className='font-bold'>To enable advertising on our Platform</p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: data gathered by the use cookies, Companyb
            beacons or similar technologies such as IP address, user ID’s,
            browser type and operating system
          </li>
          <li>
            On what basis: The prior, express, free, specific and
            informed consent of you when you accept our Privacy and Cookie
            Policy, and confirm your ad preferences. This authorisation can be
            withdrawn by you at any time. For more information, please consult
            ‘Manage Your Ad Preferences’ and our Cookie Policy.
          </li>
        </ul>
        <p className='font-bold'>
          To fulfil our obligations to game developers
        </p>
        <ul className='list-disc list-inside'>
          <li>
            Which personal data: e-mail, tax identification number, bank account
            identification, Paypal Account, preferred payment method
          </li>
          <li>On what basis: Necessary for the performance of a contract</li>
        </ul>
        <p className='font-bold'>To enable in-game purchases</p>
        <ul className='list-disc list-inside'>
          <li>Which personal data: data related to the in-game purchase</li>
        </ul>
        <p>
          Company does not collect any specific payment data when you make an
          in-game purchase. The payment is executed by a third party payment
          provider. Company store and link your in-game purchases to your
          Account. | Necessary for the performance of a contract |
        </p>
        <p>
          If you register an Account with us you give your explicit consent to
          collect a password, email address, user agent, and IP address. Company
          also facilitate the login via third party providers. If you log-in to
          our Platform using social media (such as Facebook) or Google log-in,
          you are granting permission to the third party service to share your
          user details with us. This may include your name, email address, date
          of birth and location, which will then be used to create your Account.
          These third party services may use information about your visit to our
          Platform on their pages. If you browse these pages while still logged
          in to your Account with us, information they collect may be connected
          to your Account on their website. For more information on how these
          third party services use information, please review their privacy
          policies.
        </p>
        <p>
          Company may be personalised or non-personalised content-related ads.
          To show you personalised ads and only if you have given consent via
          our Consent Management Platform (“CMP”), Company share certain data
          (such as your IP address, ad identifiers and the information that you
          have given consent for personalised ads) with third-party advertisers
          and ad networks. Company also use this information to measure how
          effective these ads are. In our CMP shown to you when you first visit
          our website, you can customise your ad tracking preferences or choose
          not to accept personalised ads at all. You can change your ad
          preferences at any time via “Preferences” in the menu of the website.
          If you choose not to receive personalised ads at all, Company will
          still show you ads, but they may not reflect your interests, as these
          ads will be content-specific and not user-specific.
        </p>
        <p>
          Company may analyse your game data from the web games you play. Based
          on your game statistics, you could get recommend games which you might
          be interested in. However, you will not be subject to decisions that
          will have a significant impact on you based solely on automated
          decision making, unless Company have a lawful basis for doing so,
          e.g., if Company have compelling legitimate grounds for us to continue
          or to establish a legal defence,and Company have notified you. Please
          note that if you are located in the European Economic Area (EEA) or
          the United Kingdom (UK), you may have the right to object at any time
          to your personal data being processed for direct marketing purposes
          (including profiling to the extent that it is related to such direct
          marketing)
        </p>
        <p>
          Company may share your personal data with other companies. These
          companies help Company to perform tasks for the Platform. For example,
          Company may disclose your personal data to suppliers of IT and payment
          services, external consultants and other subcontractors of Company who
          provide services for the website andPlatform.
        </p>
        <p>
          Additionally, Company may share information that Company collect from
          you, such as your email (in hashed form), IP address or information
          about your browser or operating system, with our identity
          partners/service providers. These partners return an online
          identification code that Company may store in our first-party cookie
          for our use in advertising and it may be shared with advertising
          companies to enable interest-based and personalised advertising.
          Personalised advertising means that companies can send you ads for
          products you might be interested in. CrazyGames works among others
          with the following ad partners:
        </p>
        <p>
          ID providers manage and distribute unique identifiers associated with
          users across various digital platforms. Unique identifiers are pieces
          of information assigned to individual users to track their activities
          and preferences across different websites and apps. These identifiers
          help advertisers and platforms understand user behaviour and deliver
          personalised ads. Due to the changing privacy-landscape, ID providers
          are adapting by finding ways to maintain personalised advertising
          capabilities while respecting user privacy. This might involve using
          anonymized or aggregated data, implementing stricter data protection
          measures (e.g., encryption), and providing users with more control
          over their data and ad preferences. Encryption scrambles for example
          your email address into a secret code that can only be deciphered with
          a decryption key. Company work with among others the following ID
          providers:
        </p>
        <p>
          By accepting our Privacy Policy and accepting these ID-providers in
          the CMP, you accept the sharing of these identifiers with these
          providers for advertising purposes.
        </p>
        <p>
          Games on our Platform may be our own games or games offered by
          external game developers. Company may share specific personal data
          with such external game developers if that’s strictly required for the
          performance of our contractual obligations with the game developers.
          Company may also share any personal information required to facilitate
          in-game purchases, such as your email address. When sharing usage data
          with a game developer about his game, Company will always anonymize
          the data. In addition, if you share feedback with us about a game,
          Company can also share this feedback with the developer of the game.
        </p>
        <p>
          If you make in-game purchases, the transaction is processed by an
          external payment provider and is subject to the external payment
          provider's privacy policy.
        </p>
        <p>
          Company may share your personal data outside the European Economic
          Area. In such a case, Company will always take appropriate and
          required measures to protect your data and privacy, including
          implementing the European Commission's Standard Contractual Clauses
          (also known as Model Clauses) or UK International Data Transfer
          Addendums where necessary to provide safeguards for your personal
          data.
        </p>
        <p>
          Should you need further details regarding how Company transfer data
          internationally and the protective measures Company employ, please
          reach out to us via email at info@jellyarcade.com
        </p>
        <p>
          Company will keep your data for as long as strictly necessary for the
          purposes listed below. With respect to your Account and linked
          personal data, Company will keep your Account until you request us to
          delete it. You can always delete your account via Account Settings.
          Please be aware that the deletion of your Account is permanent and you
          will no longer have access to any purchases linked to your Account.
        </p>
        <p>
          Following a long period of inactivity, Company might delete or archive
          personal data. Where Company have your email address, Company will
          notify you in advance before such deletion or archiving of data.
        </p>
        <p>
          Company might keep your data for longer if necessary to comply with a
          particular law or regulation, protect against fraud or abusive
          incidents, or in correspondence with any legal claims or disputes.
        </p>
        <p>
          Company will keep any personal data safe and take appropriate security
          measures.
        </p>
        <p>
          When Company use external providers to help us with the processing of
          your personal data (hereinafter called as “Processor”), Company will
          always ensure that your personal data is handled confidentially and in
          a safe manner. Company also always draw up a contract with these
          Processors. This way the Processor will never be allowed to use your
          personal data on its own initiative and your personal data has to be
          erased as soon as the Processor has completed the assignment for
          Company
        </p>
        <p>
          You are and always will be the boss of your personal data. After all,
          it is your personal data. You therefore have some rights that you can
          use. You can do the following with your data:
        </p>
        <ul className='list-disc list-inside'>
          <li>View: to see what personal data Company keeps about you;</li>
          <li>
            Edit: to let you to edit your personal data of your Account (email
            address, location, username;
          </li>
          <li>
            Delete: to delete your personal data. And company will remove your
            data from database.
          </li>
          <li>
            Freeze: in some cases you can request the restriction of your
            personal data, which means that Company are not allowed to do
            anything more with your personal data for a while;
          </li>
          <li>
            Stop receiving marketing communications: to let Company know that
            you no longer wish to receive marketing communications (for example,
            a newsletter). To do so, you can unsubscribe at the bottom of every
            newsletter Company send to you.
          </li>
          <li>
            Object to personalised advertising: you can ask Company to stop
            processing data when approaching you with personalised advertising.
            You can manage this yourself via the CMP (see ‘Manage Your Ad
            Preferences’). Please note that Company offers the Platform for free
            to its users and generates revenue by allowing companies to
            advertise on our Platform. Therefore, it is not possible to use our
            Platform without any advertisements at all;
          </li>
          <li>
            Submit a complaint: to submit a complaint about the processing of
            your personal information to Company at any time. You also have the
            right to take your complaint to a data protection supervisory
            authority.
          </li>
          <li>
            Object to Automated Individual Decision Making: to let Company know
            that you do not want to be subject to a decision based solely on
            automated processing If you believe you believe that the automated
            decision-making process has a significant impact on your rights,
            interests, or legal status.
          </li>
          <li>
            Withdraw Consents: in the situation where Company has used your
            consent as the foundation for processing your personal information,
            you have the right to retract that consent at any moment.
          </li>
        </ul>
        <p>
          Company will respond to all requests without undue delay. Should our
          response take more than one month due to the complexity or number of
          requests, Company will inform you in a timely manner and keep you
          informed. In addition, Company may ask you for more information to
          confirm your identity before Company can respond to a request.
        </p>
        <p>
          When you first visit website, you will be prompted to accept, reject
          or set advertising services according to your preference via our
          Consent Management Platform (“CMP”). You can access this CMP at any
          time in the menu of our Platform via the "Preferences"-button.
        </p>
        <p>
          In addition, at the browser level you can manage your cookies by
          adapting your browser settings. Modern browsers allow you to choose to
          block cookies or to accept only cookies from specific websites. You
          can instruct your browser to refuse all cookies or to indicate when a
          cookie is being sent. However, if you do not accept cookies, you may
          not be able to use some portions of our Platform. Please note that
          limiting third-party cookies via your browser controls does not
          prevent our first-party cookies from being set in this way.
        </p>
        <p>
          If you would like to learn more about behavioural advertising or to
          opt-out of having this information used by companies that are part of
          the Network Advertising Initiative to deliver personalised ads. Many
          of the same companies are members of the Self-Regulatory Program for
          Online Behavioral Advertising.
        </p>
        <p>
          Some advertising networks require that Company specifically list their
          opt-out links below. When you opt-out of a network, you may receive an
          “opt-out” cookie so that the network will know not to assign you new
          cookies in the future. You will continue to receive ads from that
          network, but not behaviorally targeted ads. If you erase your
          browser’s cookies, you may need to perform this process again.
        </p>
        <p>
          Please remember, if you opt-out of behaviorally targeted advertising
          you will continue to receive ads on our free, ad-supported Platform,
          but not behaviorally targeted ads. Also, if you opt-out of
          CrazyGames’s practices, you may continue to receive interest-based or
          contextual advertising through other companies.
        </p>
        <p>
          Company strives to provide a safe environment for children. The
          Platform is intended for visitors and users who are thirteen (13)
          years of age (or the applicable minimum age in your country) or older.
          If you are younger than thirteen (13) years of age or the applicable
          minimum age in your country, then please not use the Website.
        </p>
        <p>
          Our Platform or web games of developers may contain links to other
          websites that do not belong to us. If you click on such a link, you
          will be directed to that other company's website such as social media.
          You should check the privacy policy of each website you visit by
          clicking on such a link.
        </p>
        <p>
          Company have no control over and take no responsibility for the
          content, privacy policies or practices of any third-party websites or
          services.
        </p>
        <p>
          This Privacy Policy does not apply to the processing of personal data
          by data controllers other than Company, such as providers of
          third-party games available on the Platform. Such game providers may,
          for example, post their own advertisements, offer their own game
          accounts or a chat system to talk to other players. Company will
          provide you with an explicit notice when you click to play such a
          game. The relevant provider of such a third-party game is itself
          responsible for ensuring that any processing of personal data by it in
          the context of a game complies with applicable data protection
          legislation.
        </p>
        <p>
          In principle, Company does not allow third-party providers to collect
          personal data on Platform users. If personal data is nevertheless
          collected by third-party providers, Company will require that any
          processing of personal data by them, for example in the context of a
          game, complies with applicable legislation.
        </p>
        <p className='font-bold'>
          Please note that if you choose to play a third-party game, you are
          playing that game in the environment of that game's third-party
          developer, over which Company have no control. Company, therefore,
          recommend that you read the privacy statement of that game distributor
          before playing the game.
        </p>
        <ul className='list-disc list-inside'>
          <li className='font-bold'>
            Residents of certain US states are granted specific legal rights
            regarding their personal information. These rights are not absolute
            and may be subject to exceptions and exemptions. For the purposes of
            this section, "Personal Information" is defined according to the
            California Consumer Privacy Act of 2018 ("CCPA") as information that
            identifies, relates to, describes, is reasonably capable of being
            associated with, or could reasonably be linked, directly or
            indirectly, with a particular consumer or household.
          </li>
        </ul>
        <p className='font-bold'>
          In these states, individuals have enhanced rights concerning their
          Personal Information, including the ability to access, confirm,
          correct, obtain a copy of, delete, and opt-out of the sale or sharing
          of their Personal Information. They also have the right to opt-out of
          profiling for targeted advertising. Depending on the circumstances,
          Company may need to obtain consent before collecting sensitive
          personal information and limit its use and disclosure. Detailed
          notices about these rights and how to exercise them will be provided
          upon request.
        </p>
        <p>
          Company may collect or process (and may have collected or received
          during the 12 months prior to the last updated date of this Policy)
          the same categories of personal information as mentioned in Section 7
          of this Policy. Company collect and use these categories of personal
          data for the business purposes described in the "Why" column of
          Section 7, of this Policy, for the business purposes described
          therein. Furthermore, Company does not collect or process sensitive
          personal information for the purpose of inferring characteristics
          about a user.
        </p>
        <p>
          While Company do not generally sell personal information in the
          traditional sense, certain state laws, such as the CCPA, may interpret
          certain activities involving the sharing or disclosure of personal
          information as a "sale" or to the extent that any activities described
          in Sections 4 and 5 of this Privacy Policy are considered a "sale" or
          "share" of personal information under applicable state laws,
          CrazyGames will comply with all legal requirements regarding such
          activities.
        </p>
        <p>
          Company retention practices are detailed in Section 6 "How Long Do
          Company Keep Your Personal Data."
        </p>
        <p>Depending on your state of residence, your rights may include:</p>
        <ul className='list-disc list-inside'>
          <li>
            Right to Know and Delete: You may have the right to delete personal
            information Company have collected about you and to know certain
            information about our data practices in the preceding 12 months.
          </li>
          <li>
            Right to Opt-Out: You may have the right to opt-out of the sale or
            sharing of your personal information to third parties, targeted
            advertising, and profiling in furtherance of decisions that produce
            legal or similarly significant effects concerning you.
          </li>
          <li>
            Right to Limit Use and Disclosure of Sensitive Personal Information:
            You may have the right to request that Company limit the use and
            disclosure of your sensitive personal information.
          </li>
          <li>
            Right to Obtain Consent: Company may be required to obtain your
            consent before processing your sensitive Personal Information.
          </li>
          <li>
            Right to Confirm and Obtain a Copy: You may have the right to
            confirm whether Company are processing your Personal Information
            and, if feasible, obtain a copy of the Personal Information Company
            have collected about you.
          </li>
          <li>
            Right to Correct: You may have the right to correct inaccurate
            personal information that Company maintain about you.
          </li>
          <li>
            Right to Non-Discrimination For The Exercise Of Your Privacy Rights:
            You have the right to be protected from discrimination for
            exercising your CCPA rights. Company will not discriminate against
            you for exercising your rights under the CCPA.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us via email{' '}
          <a href='mailto:info@jellyarcade.com'>info@jellyarcade.com</a>
        </p>
        <p>
          From time to time, it may be necessary to amend this Privacy Policy.
          When Company announce changes to our Privacy Policy, Company will
          change the "last updated" date at the top of the document. In case you
          have an Account, Company will also notify you by email. You will
          always be able to access the most recent version of this Privacy
          Policy on our websites.?
        </p>
        <p>
          Cookies are small files that are saved on your computer when you visit
          web pages. They contain information linked to a web browser and the
          specific website. They are saved in a specific folder on your hard
          drive. If you return to a specific website, this page can recognize
          the visitor by means of the cookie and further elaborate the history.
          A web beacon is an (often transparent) graphic image, usually no
          larger than 1 pixel, that is placed on a website and that is used to
          monitor the behaviour of the user visiting the website.
        </p>
        <p>
          Cookies are used to increase visitor-friendliness: by identifying
          visitors with a cookie, they do not always have to enter the same data
          such as login information or screen settings every time you visit the
          website.
        </p>
        <p>
          In this Cookie Policy, Company explain what cookies are, their
          purposes and which cookies Company use on our websites. More
          information on your privacy and data protection rights can be found in
          our Privacy Policy.
        </p>
        <p>Often a distinction is made between two large groups of cookies:</p>
        <ul>
          <li>
            First party cookies: these cookies are created by a website to make
            the web page function better. They regulate the technical part of a
            site, such as language choice or remembering the products in the
            shopping basket in an online store. The visited website creates and
            places first party cookies.
          </li>
          <li>
            Third party cookies: these cookies are created and placed on your
            computer by another (third) party than the website you visit. They
            remember the behaviour of a surfer. Examples are social media such
            as Facebook or Twitter, but Google Analytics as Companyll. This is
            the system used most to measure website visits.
          </li>
          <li>
            Cookies essential for the correct functioning of our websites do not
            require permission. All other cookies do.
          </li>
        </ul>
        <p>
          Cookies are generally used to increase visitor-friendliness: by
          identifying visitors with a cookie, they do not always have to enter
          the same data such as login information or screen settings every time
          you visit the websites. Like other commercial websites, Company and
          our authorised, third-party service providers use cookies and other
          similar information-gathering technologies throughout our Platform to
          collect certain information automatically and store it in log files
          for a variety of legitimate business interests and purposes.
        </p>
        <p>
          Company and its authorised, third-party service providers use cookies,
          beacons, and other similar technologies on our websites either with
          your consent or for our legitimate business purposes to ensure you can
          navigate or otherwise use our websites and access secure areas of our
          websites. Company also use these technologies for statistical purposes
          and to analyse and improve the use of our Platform and prepare
          aggregated usage reports.
        </p>
        <p>
          Company wants to inform users as much as possible about the cookies
          Company use. Cookies are essential for us to optimise each visit to
          the Platform and offer you a better game experience or offer you
          relevant ads that you might be interested in. For example, cookies
          remember each choice made by you (e.g. choices related to language,
          newsletter, etc.) and help offer you all relevant services and
          suggestions.
        </p>
        <p>
          On our free, ad-supported Platform, Company use these technologies for
          our legitimate business purposes of providing standard advertising
          controls, determining user response to advertisements and promotions,
          and delivering targeted advertisements that Company or our authorised,
          third-party service providers believe will be of most interest to you.
        </p>
        <p>
          First party. Company will only use first party cookies to help improve
          your user and game experience on the Platform. Company would do this
          by recording specific information about the user such as the language
          chosen, the pages visited and the duration of the visits.
        </p>
        <p>
          Game distributors. Company may offer games from third-party game
          distributors on our Platform. By playing a third-party game, your
          personal data may be processed by the third-party game distributor
          (directly or through the use of cookies or similar technologies).
          Company will provide you with an explicit notice when you click to
          play such a game.
        </p>
        <p className='font-bold'>
          Please note that if you choose to play a third-party game, you are
          playing that game in the environment of that game's third-party
          developer, over which Company have no control. Company, therefore,
          recommend that you read the privacy statement of that game distributor
          before playing the game. Below are Company’s main gaming partners:
        </p>
        <ul className='list-disc list-inside'>
          <li>
            <a href='https://www.nothing2install.com/'>
              https://www.nothing2install.com/
            </a>
          </li>
          <li>
            Third party. Third parties might use information gathered by cookies
            and/or web beacons for the purpose of online behavioural advertising
            and/or multisite advertising. The types of information that is
            gathered by third party cookies and/or web beacons as well as the
            purpose(s) for which this information is used, are set out in the
            privacy policy of said third parties which Company encourages you to
            review. Company declines all and any liability for any third-party
            cookies or webeacons deployed by third parties for whatever purpose.
          </li>
          <li>
            Google Analytics. In addition, the Website also uses third party
            cookies such as cookies from Google Analytics. Google Analytics is a
            free service by Google to collect statistics of Website and to
            represent them in detail. The Website administrator thus has a clear
            view on visitor flows, traffic flows and page displays. This way it
            is possible to adapt parts of a Website or complete Website to the
            behaviour and interests of the visitors.
          </li>
        </ul>
      </div>
    </div>
  );
}

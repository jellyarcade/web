"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TermsOfServicePage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("legal");

  useEffect(() => {
    if (locale === "tr") {
      router.replace(`/${locale}/kullanim-kosullari`);
      return;
    }
  }, [router, locale]);

  if (locale === "tr") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 mt-24 md:px-20 lg:px-24 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("termsTitle")}</h1>
      <p className="text-sm text-gray-600 mb-8">
        {t("lastUpdated")}: {t("termsLastUpdated")}
      </p>
      <div className="prose max-w-none space-y-4">
        <p>
          JellyArcade is an instant (browser) game project of D.O.O "CB Cons".,
          a company incorporated and operating under the laws of Montenegro,
          with registration number 03588360, having its registered office at
          Palih Boraca 14, Tivat - Montenegro (hereinafter referred to as the
          "Company"). The Company aims to make games accessible online
          (hereinafter referred to as the "Platform"). Players can access the
          Platform with or without an account (hereinafter referred to as
          "Account"). The Platform is accessible through one of JellyArcade's
          Company sites, which can be seen in the address bar (hereinafter
          referred to as "Website"). These Terms of Use (hereinafter referred to
          as "Terms") are concluded between the Company, subject to the laws of
          Montenegro, and the User (hereinafter referred to as "User").
        </p>

        <p>
          User is a person who visits the Website and/or Platform, plays instant
          (browser) games, registers, creates a login, subscribes or contracts
          with the Company through any form available on the Website and/or
          Platform.
        </p>

        <p className="font-bold">
          THESE TERMS OUTLINE OUR RELATIONSHIP WITH YOU, AS SUPPLEMENTED BY OUR
          PRIVACY & COOKIE POLICY BY PLAYING WEB GAMES ON OUR PLATFORM OR
          OTHERWISE USING THE WEBSITE OR PLATFORM, YOU AGREE TO BE BOUND BY THE
          FOLLOWING TERMS AND CONDITIONS AND ALL APPLICABLE LAWS AND
          REGULATIONS.
        </p>

        <p>
          The Platform is intended for visitors and users who are thirteen (13)
          years of age (or the applicable minimum age in your country) or older.
          If you are under thirteen (13) years of age (or the applicable minimum
          age in your country), this Platform is not intended for you. We do not
          knowingly collect or solicit personal information from children under
          the age of thirteen (13) (or the applicable minimum age in your
          country) through our Platform.
        </p>

        <p>
          Your use of the Website and/or the Platform means that you are aware
          of, and agree to, the most recent version of the Terms and our Privacy
          Policy as published on the Website. It is your sole responsibility to
          ensure that your use of any and all third party websites or content
          complies with all third party requirements.
        </p>

        <p>
          We may modify these Terms from time to time. We will notify you of any
          material changes by email (if you are registered on our Platform via
          an account ("Account")) or notice on the Website (where deemed
          necessary) and will note the date of the last change. If you use the
          Website or Platform after these updates are posted, you will be deemed
          to accept these changes and agree to be bound by them. These Terms
          will continue to apply until terminated, either by you or by us, as
          described in these Terms.
        </p>

        <p>
          Our Platform (and all the available content) is licensed for your use,
          but its ownership as a property remains with Company and its
          licensors. Provided that you comply with all Terms of this Agreement,
          Company grants you a limited license to use our Platform and play the
          available web games for your personal, non-commercial use. You may
          also upload videos and stream games from our Platform on third party
          video sharing and streaming platforms but only when you follow our
          rules.
        </p>

        <p>
          Company grants you a non-exclusive, limited, non-sublicensable and
          non-transferable right to use our Platform, subject to the limitations
          set forth in these Terms and any other limitations communicated by us
          in writing. Nothing in these Terms prohibits Company from providing
          our Platform to others.
        </p>

        <p>
          Except for the limited rights expressly granted below, Company
          reserves all right, title and interest in and to our Website and
          Platform, including all related intellectual property rights. All
          games offered through our Platform are owned by Company or its
          partners. No rights are granted to you hereunder other than as
          expressly set forth herein. You agree not to reproduce, duplicate,
          copy, sell, resell or exploit any portion of the Website/Platform
          without our express written permission, not to use or access the
          Website/Platform. You may not copy, reproduce or reuse any portion of
          the visual design elements without our express written permission.
        </p>

        <p>
          Users may upload, create and provide content to Company on its own
          ('User Content'). To the extent you upload, create or otherwise
          provide User Content to us, you grant Company a non-exclusive,
          royalty-free, worldwide, sublicensable, transferable, license to use,
          copy, store, modify, transmit and display such User Content as may be
          necessary or useful to provide and maintain the Website and/or
          Services. Company reserves the right, but is not obligated, to review
          and remove User Content that is deemed to violate the provisions of
          these Terms or otherwise inappropriate, third-party rights, or
          applicable laws or regulations.
        </p>

        <p>
          Users may create, upload, livestream and monetise videos on online
          (live streaming) websites using gameplay and screenshots from games
          available on our Platform ("Gaming Content"), subject to the following
          conditions: (i) Company' Platform and its logo will be clearly visible
          and not obscured, (ii) only monetise such videos and streams in
          accordance with the monetisation methods available on such online
          websites (e.g., Youtube, Twitch,...), (iii) you do not imply or state
          that your Gaming Content is officially affiliated with, sponsored,
          endorsed or approved by Company (except when Company have entered into
          a partnership with you) and (iv) the User is responsible for any third
          party content (e.g. music) that it uses together with the Gaming
          Content. Company reserves the right to take action at any time against
          Gaming Content that Company believes is unlawful, infringing,
          inappropriate or not in accordance with these Terms.
        </p>

        <p>
          Company will use its best efforts to resolve any issues, provided that
          the User complies with these Terms.
        </p>

        <p>
          You can access our Platform and play web games with or without an
          Account. You should keep your username and password protected and
          secure. All activities that occur under your Account or on our Website
          are your responsibility. The Account information you provide to us
          must be accurate, complete, and your own. We are not responsible for
          any loss or damage arising from your failure to comply with these
          requirements or as a result of the use of your Account. If you are
          under 13 years old (or the applicable minimum age in your country of
          residence) or do not understand what this agreement is about, you and
          your parent or guardian must review this agreement together. Your
          right to use our Platform is also subject to limitations. In general,
          you should avoid doing anything that might harm Company or anyone
          else. Among other things, you may not copy the Platform or use any
          content in an illegal or harmful manner, make any misrepresentations
          of or abuse our services, or otherwise violate anyone's rights or any
          applicable laws. Failure to abide by any of these rules may bring us
          to revoke and cancel your Account, and void this agreement.
        </p>

        <p>
          You can access our Platform with or without an Account. In order to
          create your Account, log in to the Website, and/or participate in the
          Platform offered, you must be eligible and agree to the terms and
          conditions set forth below. Failure to qualify and continuously comply
          with any of the following terms and conditions constitutes a violation
          of these Terms and may result in the termination of your Account and
          permission to use the Website and Platform. In particular, you agree
          that:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li className="font-bold">
            You are either (a) of age to give legal consent or (b) you are a
            minor over thirteen (13) years old or the applicable minimum age in
            your country, state, or province or (c) have the consent of your
            parents (or your legal guardian), to access the Website under the
            laws of all jurisdictions applicable to you. We expressly reserve
            the right (but have no obligation) to request proof of your age at
            any time;
          </li>
          <li>
            All information you provide to us in your registration form for the
            purpose of establishing your Account will be true and correct and
            you will promptly notify us of any changes to such information;
          </li>
          <li>
            Your Account is solely for your use and may not be used by any third
            party. You may not allow any third party to use your Account,
            password, login or user ID to access or use the Website, the
            Platform, or for any other purpose. We take no responsibility for
            any third party access to your Account. You must immediately notify
            us of any unauthorized use of your password and identification
            and/or breach. You accept responsibility for all activities that
            occur under your Account, username or password and all such use is
            deemed authorized by you. You are responsible for the security of
            the password you use to access the Platform and for all activities
            or actions under your password, whether your password is with our
            Platform or with a third party service;
          </li>
          <li>
            You have verified and determined that your use of the Website and
            Platform does not violate any law or regulation in any jurisdiction
            applicable to you. It is your sole responsibility to ensure that
            this is the case;
          </li>
          <li>
            You will not use the Website or the Platform for fraudulent or
            otherwise illegal purposes;
          </li>
          <li>
            You understand that Company may detect your Internet access
            location, without obligation, and may use techniques intended to
            block or restrict access from a jurisdiction where participation in
            the Website or Platform is illegal or restricted;
          </li>
          <li>
            You will not mask your identity in any way, including, but not
            limited to, IP masking or accessing the Website through any type of
            proxy server; and
          </li>
          <li>
            You will ensure that all use of your Account is in full compliance
            with these Terms. We may suspend or terminate your access to the
            Website and Platform without notice to you if you do not use the
            Website or Platform for an extended period of time.
          </li>
          <li>
            You agree to use the Website and/or the Platform only for its
            intended purpose, and You will not:
            <ul className="list-disc mt-2 pl-6 space-y-2">
              <li>
                sublicense, lease, rent, lend, distribute or otherwise transfer
                the Website and Platform to any third party;
              </li>
              <li>
                decompile, reverse engineer, disassemble or otherwise derive the
                source code of the Website and/or the Platform;
              </li>
              <li>
                use or copy the Website or the Platform, except as expressly
                permitted in these Terms;
              </li>
              <li>
                use the Website and/or the Platform to generate unsolicited
                email advertisements or spam;
              </li>
              <li>
                modify, remove or render illegible any copyright notice, digital
                watermark, proprietary legend or other notice contained on the
                Website and/or Platform.
              </li>
              <li>
                intentionally distribute worms, Trojan horses, corrupt files or
                other items of a destructive or misleading nature or use the
                Website and/or Platform for illegal, invasive, infringing,
                defamatory or fraudulent purposes;
              </li>
              <li>
                remove or in any way circumvent technical or other protection
                measures on the Website and/or on the Platform;
              </li>
              <li>
                Web Scraping and Automatic Data Collection: You may not, without
                our prior written consent, use any robot, spider, scraper, deep
                link or other automated data gathering or extraction tools,
                program, algorithm or methodology to access, acquire, copy or
                monitor any portion of the Website/Platform or its content,
                including user accounts, user data, or any other proprietary
                information or data related to the Website, for any purpose,
                including, but not limited to, commercial purposes such as
                training machine learning algorithms or artificial intelligence
                models
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Notwithstanding above, you may (a) temporarily store copies of such
          materials in RAM, (b) store files that are automatically cached by
          your web browser to improve screen display, and (c) print a reasonable
          number of pages from the Website; provided that, in each case, you do
          not modify or delete any reference to copyright or other proprietary
          notices contained in such materials.
        </p>
        <p>
          All content and/or opinions uploaded, expressed or submitted on any
          message board, blog, chat room or other publicly accessible part of
          the Website or games available on the Platform, and all articles and
          answers to questions, other than content provided by Company, are
          solely the opinions and responsibility of the person or entity sharing
          them and do not reflect the opinions of Company. You understand and
          acknowledge that you are responsible for the content you share and
          that you bear full responsibility for such content, including its
          legality, reliability and appropriateness.
        </p>
        <p>
          Notwithstanding the above, you agree to not post, transmit or
          otherwise make available through or in connection with the Platform
          any materials that are or may be: (a) threatening, harassing,
          degrading, hateful, intimidating an individual or group of individuals
          on the basis of religion, gender, sexual orientation, race, ethnicity,
          age, or disability, or otherwise fail to respect the rights and
          dignity of others; (b) defamatory, libelous, fraudulent, invasive of
          another's privacy or otherwise tortious; (c) obscene, endangers or
          exploits children, indecent, pornographic or otherwise objectionable;
          or (d) protected by copyright, trademark, trade secret, right of
          publicity or privacy or any other proprietary right, without the
          express prior written consent of the applicable owner.
        </p>
        <p className="font-bold">
          Company can always check whether your information and use of the
          Platform complies with Company’s rules.
        </p>
        <p>
          Company reserve the right (but do not assume the obligation) to
          conduct an audit at any time to validate your Account information
          and/or to ensure that your participation on the Website and use of the
          Platform does not violate these Terms and/or any applicable law. You
          authorize Company and Company’s agents to make any inquiries to you
          and for us to use and disclose to third parties that Company deem
          necessary to validate this information. To facilitate the
          aforementioned validation, you agree to provide sufficient information
          or documentation as Company, in our sole discretion, may request. If
          you do not provide such information within thirty (30) days of our
          request, if your responses are incomplete or otherwise insufficient,
          or if Company are unable to verify the information applicable to your
          account, your account may be terminated.
        </p>
        <p>
          Notwithstanding the above, Company reserves the right to remove the
          username linked to your Account if it does not comply with these
          Terms.
        </p>
        <p>
          Company's use of your personal data and our responsibilities in
          protecting your privacy are described in our Privacy Policy.
        </p>
        <p className="font-bold">
          Company don’t control third-party services, and Company’re not liable
          for any transactions you may perform with them, or for what they do.
          When using third-party services, your security is your responsibility.
          Please be aware that promotions that are made available through our
          Platform may be subject to additional rules.
        </p>
        <p>
          Website contains links to other websites on the internet. Company is
          neither responsible for nor endorses the content, products, services
          or practices of third-party websites, including, but not limited to,
          websites embedded in our Website or third-party advertisements, and
          makes no representations regarding the quality, content, accuracy or
          suitability of these websites in the context of your viewing or use.
          Your use of third-party websites is at your own risk and subject to
          the terms of use of such websites.
        </p>
        <p>
          IN THE EVENT THAT YOU CHOOSE TO PURCHASE A PRODUCT OR SERVICE FROM A
          THIRD PARTY, COMPANY IS NOT RESPONSIBLE FOR SUCH PRODUCTS OR SERVICES,
          AS IT IS NOT A PARTY TO SUCH A TRANSACTION AND IS NOT LIABLE FOR ANY
          DIRECT OR INDIRECT COSTS OR DAMAGES ARISING FROM ANY DISPUTE BETWEEN
          YOU AND SUCH THIRD PARTY. NEITHER COMPANY, NOR ITS LICENSORS OR
          CONTRACTORS, MAKE ANY EXPRESS OR IMPLIED REPRESENTATIONS OR WARRANTIES
          REGARDING THE GOODS OR SERVICES OFFERED BY SUCH MERCHANT, INCLUDING,
          BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT OF CERTAIN RIGHTS OR
          COMPATIBILITY.
        </p>
        <p>
          Any sweepstakes, contests, raffles, surveys, games or similar
          promotions (collectively, “Promotions”) made available through the
          Website may be governed by rules that are separate from these Terms.
          If you participate in any Promotions, please review the applicable
          rules as well as our Privacy Policy. If the rules for a Promotion
          conflict with these Terms, the Promotion rules will govern.
        </p>
        <p className="font-bold">
          Company does not sell in-game items or offer in-game services to our
          users. Company do, however, facilitate such purchases and services
          through a third party. When you purchase in-game items or services for
          a web game, these purchases are linked to your Account with Company.
          Company have no control over these in-game items and services and
          reject any liability with respect to these purchases. Please carefully
          read the relevant terms and conditions of the third party and their
          refund policy before you buy any in-game items or services.
        </p>
        <p>
          Company facilitates the purchase of in-game purchases between you and
          the developer of the web game through the third-party provider Xsolla.
          You acknowledge that this third-party has its own terms and conditions
          (https://xsolla.com/eula) and that Company are not responsible for
          these terms. Your in-game purchases will be linked to your Account as
          well as to your account with the third-party provider.
        </p>
        <p>
          Please note that in-game purchases and the quality of the game are
          regulated by the agreement between you and the third party and/or game
          developers, where applicable. For example, Company is not responsible
          for any missing in-game items or any bugs that may occur. Refunds are
          subject to the refund policy of the third party. For Xsolla related
          purchases please refer to https://xsolla.com/refund-policy.
        </p>
        <p className="font-bold">
          You are not allowed to misuse any logos or names that are available on
          the Website.
        </p>
        <p>
          Unless otherwise indicated, all logos, names, packaging designs and
          marks on the Website are trademarks or service marks owned or used
          under license by us or our business partners. The use or misuse of any
          of these marks or other information is strictly prohibited.
        </p>
        <p className="font-bold">
          Other websites can embed our games under the conditions below. We can
          stop embedding any game at any time without justification.
        </p>
        <p>
          Company allows other websites to iframe portions of the Website only
          when it provides a button “embed” to retrieve an iframe source code.
        </p>
        <p>
          When embedded, there will be in-game advertisements inside the game.
        </p>
        <p>
          Company reserves the right to withdraw qualification at any time and
          block sites from embedding games at its own discretion, without
          warning or the requirement to provide justification.
        </p>
        <p>It is strictly forbidden to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Reproduce, modify, adapt, translate, create derivative works of any
            iframed portion of the Website.
          </li>
          <li>
            Remove, hide or in any other way hinder the viewability of any
            copyright, trademark or other proprietary rights notice from the
            iframed portion of the Website.
          </li>
          <li>
            Remove, block, hide or in any other way hinder the performance of
            links in the iframed portion of the Website.
          </li>
          <li>
            Remove, block, make invisible or in any other way hinder the
            operation of advertising included in the iframed portion of the
            Website.
          </li>
          <li>Add any layers above the iframed portion of the Website.</li>
          <li>
            Company reserves the right to discontinue an iframed portion of the
            Website at any time.
          </li>
          <li>
            If you have any questions regarding embedding our games, please
            reach out to info@jellyarcade.com
          </li>
        </ul>
        <p className="font-bold">
          Company offer no warranties regarding our services and the Platform,
          including any regarding their quality, reliability, security, or
          compatibility.
        </p>
        <p className="font-bold">
          YOU WARRANT THAT YOU WILL ABIDE BY AND RESPECT THESE TERMS OF SERVICE
          AND ANY ADDITIONAL GUIDELINES OF OUR PLATFORM. IF THESE CAUSE YOU ANY
          HARM, COMPANY WILL NOT BE HELD LIABLE.
        </p>
        <p>
          You understand that Company cannot and do not represent or warrant
          that files available for downloading from the Internet will be free of
          viruses, worms, Trojan horses or other code that may have contaminated
          or destructive properties. You are responsible for implementing
          sufficient procedures and checkpoints to meet your specific
          requirements for accuracy of data input and output, and for
          maintaining a means outside the Website and Platform for
          reconstructing lost data. We assume no responsibility or risk for your
          use of the Internet.
        </p>
        <p>
          COMPANY’S SERVICES AND ALL MATERIALS ON THE WEBSITE AND PLATFORM ARE
          PROVIDED "AS IS" AND "AS AVAILABLE" AND WITHOUT WARRANTIES OF ANY
          KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF
          MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. COMPANY MAKES NO
          REPRESENTATIONS OR WARRANTIES ABOUT THE ACCURACY, COMPLETENESS, OR
          SUITABILITY OF ANY MATERIAL ON THE WEBSITE, OR ON ANY WEBSITE OR
          WEBSITES "LINKED" TO THE WEBSITE. COMPANY DOES NOT WARRANT THAT THE
          WEBSITE AND/OR OUR PLATFORM WILL BE AVAILABLE, UNINTERRUPTED,
          ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>
        <p className="font-bold">
          To the extent permitted under applicable law, Company are not liable
          for user damages exceeding 25 EUR, as our Platform is free to play.
        </p>
        <p className="font-bold">
          TO THE EXTENT PERMITTED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES WILL
          COMPANY OR ITS DIRECTORS, EMPLOYEES, PARTNERS, LICENSORS, CONTRACTORS,
          AGENTS, SUPPLIERS OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT
          NOT LIMITED TO LOST PROFITS, LOSS OF DATA, USE, GOODWILL OR OTHER
          INTANGIBLE LOSSES, ARISING FROM (I) YOUR ACCESS TO OR USE OF OR
          INABILITY TO ACCESS OR USE THE PLATFORM; (II) ANY THIRD-PARTY CONDUCT
          OR CONTENT ON THE PLATFORM; (III) ANY CONTENT OBTAINED FROM THE
          PLATFORM; (IV) ANY ACTION TAKEN IN CONNECTION WITH COPYRIGHT,
          TRADEMARK, OR INTELLECTUAL PROPERTY RIGHTS INFRINGEMENT; (V) ANY
          DAMAGE CAUSED BY A USER'S COMPUTER, SOFTWARE, HARDWARE SECURITY BREACH
          INCLUDING, BUT NOT LIMITED TO, DAMAGE FROM ANY SECURITY BREACH, VIRUS,
          BUGS, TAMPERING, FRAUD, ERRORS, DELAYS, OR MALFUNCTIONS; AND (IIV)
          UNAUTHORIZED ACCESS, USE OR MODIFICATION OF YOUR TRANSMISSIONS OR
          CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
          NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND EVEN IF ANY REMEDY SET
          FORTH HEREIN IS FOUND TO FAIL OF ITS ESSENTIAL PURPOSE.
        </p>
        <p>
          CERTAIN JURISDICTIONS PROHIBIT THE DISCLAIMER OF IMPLIED WARRANTIES OR
          THE LIMITATION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES.
          THEREFORE, SOME OF THE LIMITATIONS AND EXCLUSIONS STATED ABOVE MAY NOT
          APPLY TO YOU IF YOU RESIDE IN ONE OF THOSE JURISDICTIONS.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE MAXIMUM
          LIABILITY OF COMPANY TO YOU ARISING FROM THESE TERMS OF SERVICE WILL
          IN NO EVENT EXCEED THE AMOUNT OF TWENTY FIVE (25) EUR CONSIDERING THE
          USE OF THE WEBSITE IS FREE OF CHARGE. THE AFOREMENTIONED LIMITATIONS
          WILL NOT IMPACT USER’S STATUTORY RIGHTS AND DOES NOT APPLY TO A
          PARTY'S LIABILITY RESULTING FROM (I) FRAUD OR DECEIT, (II) GROSS
          NEGLIGENCE; (III) DEATH OR PERSONAL INJURY; AND/OR (IV) WILLFUL
          MISCONDUCT.
        </p>
        <p className="font-bold">
          If Company is sued or otherwise put in harm’s way because of something
          you did, you will bear the associated costs and damages.
        </p>
        <p>
          You agree to defend, indemnify and hold harmless Company, its
          subsidiaries, affiliates, licensors, content providers, service
          providers, employees, agents, officers, directors and contractors (the
          "Indemnified Parties") from and against any and all liability, loss or
          damage, costs or expenses, including but not limited to court costs,
          attorneys' fees, and any awards or damages caused by, in connection
          with or incidental to: (a) your use of our Platform; (b) the Website;
          or (c) other services offered through the Website.
        </p>
        <p className="font-bold">
          You can delete your Account at any time yourself in our Platform.
          Furthermore, Company can terminate or suspend your access to our
          Platform when Company believes that you do not follow rules.
        </p>
        <p className="font-bold">
          Company reserves the right to terminate these Terms and end your
          access to the Website and/or Platform, or temporarily suspend all or
          part of your access, at any time and without prior notice under the
          following circumstances: * If Company have a reasonable belief that
          you have violated, or may potentially violate, any term or provision
          outlined in these Terms; * If Company determine that termination or
          suspension of your access is required by applicable law or legal
          obligation; * At Company’s sole discretion, for any other reason
          Company deems suspension or termination necessary or appropriate. *
          Company may delete any Account Information or other material related
          to your use of the Website and/or our Platform on servers or otherwise
          in possession. You acknowledge that Company will not be liable to you
          or any third party for any termination of your access to the Website
          and/or Platform. * You can delete your Account at any time by going to
          account settings and clicking on “Delete your account”, or request
          Company to delete your Account by email.
        </p>
        <p className="font-bold">
          If you have any concerns or complaints, please email to Comapny
          at info@jellyarcade.com
        </p>
        <p>
          Company value your opinion. if you provide us with feedback, including
          data, variables, comments, suggestions, ideas, notes, drawings,
          graphics, concepts or other information ("Feedback"), you are
          providing that Feedback, and all of your rights thereto, free of
          charge, and such Feedback will be treated as non-confidential and
          non-proprietary and may be used by us for any purpose, without your
          consent or any compensation to you or anyone else. This applies
          whether you submit such Feedback to Company by email, through a form
          on the Website, on a bulletin board or otherwise.
        </p>
        <p>
          If you believe in good faith that materials available on the Website
          or Platform infringe your copyright, you (or your agent) may send
          Company a written notice by e-mail, requesting that Company remove
          such material or block access to it. If you believe in good faith that
          someone has wrongly filed a notice of copyright infringement against
          you, you can send Company a counter-notice. Notices and
          counter-notices must be sent in writing to: info@jellyarcade.com.
        </p>
        <p>
          For US Residents Only: If you are a copyright owner or an agent
          thereof and believe that your intellectual property rights have been
          infringed upon, you may submit a notification pursuant to the Digital
          Millennium Copyright Act (“DMCA”) by providing our copyright agent
          with the following information in writing (see 17 U.S.C 512(c)(3) for
          further detail):
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A physical or electronic signature of a person authorized to act on
            behalf of the owner of an exclusive right that is allegedly
            infringed;
          </li>
          <li>
            Identification of the copyrighted work claimed to have been
            infringed, or, if multiple copyrighted works at a single online site
            are covered by a single notification, a representative list of such
            works at that site;
          </li>
          <li>
            Identification of the material that is claimed to be infringing or
            to be the subject of infringing activity and that is to be removed
            or access to which is to be disabled, and information reasonably
            sufficient to permit the service provider to locate the material;
          </li>
          <li>
            information reasonably sufficient to permit Company to contact you,
            such as an address, telephone number, and, if available, an e-mail
            address;
          </li>
          <li>
            a statement that you have a good faith belief that use of the
            material in the manner complained of is not authorized by the
            copyright owner, its agent, or the law; and
          </li>
          <li>
            a statement that the information in the notification is accurate,
            and under penalty of perjury, that you are authorized to act on
            behalf of the owner of an exclusive right that is allegedly
            infringed.
          </li>
          <li>
            You can contact with Company via email (info@jellyarcade.com). Upon
            receipt of a notification, Company will take whatever action, in its
            sole discretion, it deems appropriate, including removal of the
            challenged content from the Website or Platform.
          </li>
        </ul>
        <p className="font-bold">
          Mindful of the high costs of legal disputes, Company want to try to
          settle any disputes with you related to the Terms by initially
          attempting to resolve the matter in good faith through written notice.
        </p>
        <p>
          Mindful of the high cost of legal dispute, not only in money but also
          in time and energy, both you and Company agree to the following
          dispute resolution procedure: In the event of any controversy, claim,
          action, or dispute arising out of or related to the breach,
          enforcement, interpretation, or validity of these Terms or any part of
          it, the party asserting the dispute will first try in good faith to
          settle such dispute by providing written notice to the other party by
          registered mail describing the facts and circumstances (including any
          relevant documentation) of the dispute and allowing the receiving
          party 30 days from the date of mailing to respond to the dispute.
          Notice will be sent to info@jellyarcade.com.
        </p>
        <p>
          Unless you indicate otherwise in your notice, Company will respond to
          your notice using your last-used e-mail address that Company have.
        </p>
        <p>
          In the event that Company is unable to resolve the dispute, you and
          Company both agree that the parties will resolve their dispute in
          accordance with article 16 below.
        </p>
        <p className="font-bold">
          Summary: As a Montenegrin-based company, the law that governs these
          terms and conditions and our relationship with you is Montenegrin law.
          Any disputes need to be resolved by the competent courts of Podgorica
          (Montenegro).
        </p>
        <p>
          These Terms will be construed in accordance with Montenegrin law,
          without prejudice to any other imperative provision of law more
          favorable to you applicable in your country of habitual residence.
        </p>
        <p>
          The competent courts of Podgorica will have exclusive jurisdiction
          over any dispute or controversy arising from or related to these Terms
          or its subject matter.
        </p>
        <p>
          To the extent permitted by law, the Parties agree that all claims and
          disputes made against the other in your or its individual capacity,
          and not as a plaintiff or class member in any purported class action,
          class arbitration, or representative proceeding.
        </p>
        <p>
          If any provision of these Terms is deemed invalid, illegal or
          unenforceable, such provision will be deemed amended to comply with
          applicable law and the remaining provisions of the Terms will continue
          in full force and effect to the extent permitted by law.
        </p>
        <p>
          These Terms and our Privacy Policy represent the entire understanding
          and agreement between the parties with respect to the subject matter
          hereof and supersede all prior or contemporaneous oral or written
          communications with respect to the subject matter.
        </p>
        <p>
          Your use of the Website/Platform does not create an employment,
          partnership, joint venture or any other relationship beyond that of a
          website user governed by these Terms. Company cannot be held
          responsible in case of default (temporary or otherwise) or in case of
          failure to perform any of its obligations as a result of a case of
          force majeure or coincidence.
        </p>
        <p>
          These Terms, and any rights and licenses granted hereunder, may not be
          transferred or assigned by you, but may be assigned by Company without
          restriction.
        </p>
        <p>
          Company' waiver of any term in these Terms does not imply an ongoing
          or additional waiver of that term or any other term, and Company'
          failure to enforce a right or provision does not constitute a waiver
          of that right or provision.
        </p>
      </div>
    </div>
  );
}

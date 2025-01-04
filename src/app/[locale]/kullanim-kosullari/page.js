'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function TermsOfServicePage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('legal');

  useEffect(() => {
    if (locale === 'en') {
      router.replace(`/${locale}/terms-of-service`);
      return;
    }
  }, [router, locale]);

  if (locale === 'en') {
    return null;
  }

  return (
    <div className='container mx-auto px-4 mt-24 md:px-20 lg:px-24 py-8'>
      <h1 className='text-3xl font-bold mb-6'>{t('termsTitle')}</h1>
      <p className='text-sm text-gray-600 mb-8'>
        {t('lastUpdated')}: {t('termsLastUpdated')}
      </p>
      <div className='prose max-w-none space-y-4'>
        <p>
          JellyArcade, Karadağ yasalarına göre kurulmuş ve faaliyet gösteren,
          03588360 sicil numaralı, kayıtlı merkezi Palih Boraca 14, Tivat -
          Karadağ adresinde bulunan CB CONS d.o.o. şirketinin (bundan böyle
          "Şirket" olarak anılacaktır) bir anlık (tarayıcı) oyun projesidir.
          Şirket, oyunları çevrimiçi olarak erişilebilir kılmayı amaçlamaktadır
          (bundan böyle "Platform" olarak anılacaktır). Oyuncular Platforma
          hesaplı veya hesapsız erişebilirler (bundan böyle "Hesap" olarak
          anılacaktır). Platform, adres çubuğunda görülebilen JellyArcade'in
          Şirket sitelerinden biri aracılığıyla erişilebilir (bundan böyle "Web
          Sitesi" olarak anılacaktır). Bu Kullanım Koşulları (bundan böyle
          "Koşullar" olarak anılacaktır) Karadağ yasalarına tabi olan Şirket ile
          Kullanıcı (bundan böyle "Kullanıcı" olarak anılacaktır) arasında
          akdedilmiştir.
        </p>

        <p>
          Kullanıcı, Web Sitesini ve/veya Platformu ziyaret eden, anlık
          (tarayıcı) oyunlar oynayan, Web Sitesi ve/veya Platform üzerinde
          mevcut herhangi bir form aracılığıyla Şirket ile kayıt olan, giriş
          oluşturan, abone olan veya sözleşme yapan kişidir.
        </p>

        <p className='font-bold'>
          BU KOŞULLAR, GİZLİLİK VE ÇEREZ POLİTİKAMIZ İLE TAMAMLANAN SİZİNLE OLAN
          İLİŞKİMİZİ ÖZETLER. PLATFORMUMUZDA WEB OYUNLARI OYNAYARAK VEYA WEB
          SİTESİNİ VEYA PLATFORMU BAŞKA ŞEKİLDE KULLANARAK, AŞAĞIDAKİ HÜKÜM VE
          KOŞULLARA VE GEÇERLİ TÜM YASA VE YÖNETMELİKLERE BAĞLI KALMAYI KABUL
          EDERSİNİZ.
        </p>

        <p>
          Platform, on üç (13) yaşında (veya ülkenizdeki geçerli minimum yaşta)
          veya daha büyük ziyaretçiler ve kullanıcılar için tasarlanmıştır. On
          üç (13) yaşından (veya ülkenizdeki geçerli minimum yaştan) küçükseniz,
          bu Platform sizin için tasarlanmamıştır. Platformumuz aracılığıyla on
          üç (13) yaşından (veya ülkenizdeki geçerli minimum yaştan) küçük
          çocuklardan bilerek kişisel bilgi toplamaz veya talep etmeyiz.
        </p>

        <p>
          Web Sitesini ve/veya Platformu kullanmanız, Web Sitesinde yayınlanan
          Koşulların ve Gizlilik Politikamızın en son sürümünden haberdar
          olduğunuz ve bunları kabul ettiğiniz anlamına gelir. Herhangi bir
          üçüncü taraf web sitesini veya içeriğini kullanımınızın tüm üçüncü
          taraf gerekliliklerine uygun olmasını sağlamak tamamen sizin
          sorumluluğunuzdadır.
        </p>

        <p>
          Bu Koşulları zaman zaman değiştirebiliriz. Önemli değişikliklerden
          sizi e-posta yoluyla (Platformumuzda bir hesap ("Hesap") üzerinden
          kayıtlıysanız) veya Web Sitesinde bildirim yoluyla (gerekli
          görüldüğünde) haberdar edeceğiz ve son değişiklik tarihini
          belirteceğiz. Bu güncellemeler yayınlandıktan sonra Web Sitesini veya
          Platformu kullanırsanız, bu değişiklikleri kabul etmiş ve bunlarla
          bağlı kalmayı kabul etmiş sayılırsınız. Bu Koşullar, bu Koşullarda
          belirtildiği gibi, sizin veya bizim tarafımızdan feshedilene kadar
          geçerli olmaya devam edecektir.
        </p>

        <p>
          Platformumuz (ve mevcut tüm içerik) kullanımınız için lisanslanmıştır,
          ancak mülkiyet olarak sahipliği Şirket ve lisans verenlerinde
          kalmaktadır. Bu Sözleşmenin tüm Koşullarına uymanız şartıyla, Şirket
          size Platformumuzu kullanmanız ve mevcut web oyunlarını kişisel,
          ticari olmayan kullanımınız için oynamanız için sınırlı bir lisans
          verir. Ayrıca, kurallarımıza uyduğunuzda Platformumuzdan oyunların
          videolarını yükleyebilir ve üçüncü taraf video paylaşım ve yayın
          platformlarında yayınlayabilirsiniz.
        </p>

        <p>
          Şirket size, bu Koşullarda belirtilen sınırlamalara ve yazılı olarak
          bildirdiğimiz diğer sınırlamalara tabi olmak üzere, Platformumuzu
          kullanmak için münhasır olmayan, sınırlı, alt lisanslanamaz ve
          devredilemez bir hak verir. Bu Koşullarda yer alan hiçbir şey,
          Şirketin Platformumuzu başkalarına sağlamasını engellemez.
        </p>

        <p>
          Aşağıda açıkça verilen sınırlı haklar dışında, Şirket, ilgili tüm
          fikri mülkiyet hakları da dahil olmak üzere Web Sitemiz ve
          Platformumuz üzerindeki tüm hak, mülkiyet ve menfaatleri saklı tutar.
          Platformumuz aracılığıyla sunulan tüm oyunlar Şirket veya iş
          ortaklarının mülkiyetindedir. Burada açıkça belirtilenler dışında size
          hiçbir hak verilmemektedir. Web Sitesi/Platformun herhangi bir
          bölümünü açık yazılı iznimiz olmadan çoğaltmamayı, kopyalamamayı,
          satmamayı, yeniden satmamayı veya kullanmamayı, Web Sitesi/Platforma
          erişmemeyi kabul edersiniz. Görsel tasarım öğelerinin herhangi bir
          bölümünü açık yazılı iznimiz olmadan kopyalayamaz, çoğaltamaz veya
          yeniden kullanamazsınız.
        </p>

        <p>
          Kullanıcılar Şirkete kendi başına içerik yükleyebilir, oluşturabilir
          ve sağlayabilir ('Kullanıcı İçeriği'). Bize Kullanıcı İçeriği
          yüklediğiniz, oluşturduğunuz veya başka şekilde sağladığınız ölçüde,
          Şirkete Web Sitesini ve/veya Hizmetleri sağlamak ve sürdürmek için
          gerekli veya yararlı olabilecek şekilde bu tür Kullanıcı İçeriğini
          kullanmak, kopyalamak, depolamak, değiştirmek, iletmek ve görüntülemek
          için münhasır olmayan, telifsiz, dünya çapında, alt lisanslanabilir,
          devredilebilir bir lisans verirsiniz. Şirket, bu Koşulların
          hükümlerini ihlal ettiği veya başka şekilde uygunsuz olduğu, üçüncü
          taraf haklarını veya geçerli yasa ve yönetmelikleri ihlal ettiği
          düşünülen Kullanıcı İçeriğini inceleme ve kaldırma hakkını saklı
          tutar, ancak bununla yükümlü değildir.
        </p>

        <p>
          Kullanıcılar, Platformumuzda mevcut oyunlardan oyun görüntüleri ve
          ekran görüntüleri kullanarak çevrimiçi (canlı yayın) web sitelerinde
          videolar oluşturabilir, yükleyebilir, canlı yayın yapabilir ve para
          kazanabilir ("Oyun İçeriği"), aşağıdaki koşullara tabi olarak: (i)
          Şirket'in Platformu ve logosu açıkça görünür olacak ve
          gizlenmeyecektir, (ii) yalnızca bu tür çevrimiçi web sitelerinde (örn.
          Youtube, Twitch,...) mevcut olan para kazanma yöntemlerine uygun
          olarak videolardan ve yayınlardan para kazanılacaktır, (iii) Oyun
          İçeriğinizin Şirket ile resmi olarak bağlantılı olduğunu, Şirket
          tarafından desteklendiğini, onaylandığını veya kabul edildiğini ima
          etmeyecek veya belirtmeyeceksiniz (Şirket'in sizinle bir ortaklık
          kurduğu durumlar hariç) ve (iv) Kullanıcı, Oyun İçeriği ile birlikte
          kullandığı herhangi bir üçüncü taraf içeriğinden (örn. müzik)
          sorumludur. Şirket, Şirket'in yasa dışı, ihlal edici, uygunsuz veya bu
          Koşullara uygun olmadığına inandığı Oyun İçeriğine karşı herhangi bir
          zamanda harekete geçme hakkını saklı tutar.
        </p>

        <p>
          Şirket, Kullanıcının bu Koşullara uyması şartıyla, herhangi bir sorunu
          çözmek için elinden gelen çabayı gösterecektir.
        </p>

        <p>
          Platformumuza Hesaplı veya Hesapsız erişebilir ve web oyunları
          oynayabilirsiniz. Kullanıcı adınızı ve şifrenizi korumalı ve güvende
          tutmalısınız. Hesabınız altında veya Web Sitemizde gerçekleşen tüm
          faaliyetler sizin sorumluluğunuzdadır. Bize sağladığınız Hesap
          bilgileri doğru, eksiksiz ve size ait olmalıdır. Bu gerekliliklere
          uymadığınız veya Hesabınızın kullanımı sonucunda ortaya çıkan herhangi
          bir kayıp veya zarardan sorumlu değiliz. 13 yaşından küçükseniz (veya
          ikamet ettiğiniz ülkedeki geçerli minimum yaştan) veya bu sözleşmenin
          ne hakkında olduğunu anlamıyorsanız, siz ve ebeveynleriniz (veya yasal
          vasiniz) bu sözleşmeyi birlikte incelemelisiniz. Platformumuzu
          kullanma hakkınız ayrıca sınırlamalara tabidir. Genel olarak, Şirkete
          veya başka birine zarar verebilecek herhangi bir şeyden
          kaçınmalısınız. Diğer şeylerin yanı sıra, Platformu kopyalayamaz veya
          herhangi bir içeriği yasa dışı veya zararlı bir şekilde
          kullanamazsınız, hizmetlerimizi yanlış tanıtamaz veya kötüye
          kullanamazsınız veya başka bir şekilde herhangi birinin haklarını veya
          geçerli yasaları ihlal edemezsiniz. Bu kurallardan herhangi birine
          uymamak, Hesabınızı iptal etmemize ve bu sözleşmeyi geçersiz kılmamıza
          neden olabilir.
        </p>

        <p>
          Platformumuza Hesaplı veya Hesapsız erişebilirsiniz. Hesabınızı
          oluşturmak, Web Sitesine giriş yapmak ve/veya sunulan Platforma
          katılmak için uygun olmanız ve aşağıda belirtilen hüküm ve koşulları
          kabul etmeniz gerekir. Aşağıdaki hüküm ve koşullardan herhangi birine
          uygun olmamak ve sürekli olarak uymamak, bu Koşulların ihlalini
          oluşturur ve Hesabınızın sonlandırılmasına ve Web Sitesi ve Platformu
          kullanma izninizin iptaline neden olabilir. Özellikle, aşağıdakileri
          kabul edersiniz:
        </p>

        <ul className='list-disc pl-6 space-y-2'>
          <li className='font-bold'>
            Ya (a) yasal onay verme yaşındasınız ya da (b) on üç (13) yaşından
            büyük veya ülkenizde, eyaletinizde veya ilinizdeki geçerli minimum
            yaştaki bir reşit olmayan kişisiniz ya da (c) size uygulanabilir tüm
            yargı bölgelerinin yasaları uyarınca Web Sitesine erişmek için
            ebeveynlerinizin (veya yasal vasinizin) onayına sahipsiniz. Herhangi
            bir zamanda yaşınızın kanıtını talep etme hakkını (ancak
            yükümlülüğünü değil) açıkça saklı tutarız;
          </li>
        </ul>
      </div>
    </div>
  );
}

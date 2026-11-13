import { ContactForm } from "@/components/ContactForm";
import { Footer, InnerHero } from "@/components/SiteChrome";

const contacts = [
  ["ZƏNG EDİN", "(+994 55) 205 60-00", "Proqramlar və korporativ həllər haqqında danışaq."],
  ["BİZƏ YAZIN", "info@pmo.az", "Müraciət və əməkdaşlıq təkliflərinizi gözləyirik."],
  ["İŞ SAATLARI", "09:00–18:00", "Bazar ertəsi – Cümə"],
];
const faq = [
  [
    "Proqrama necə qeydiyyatdan keçə bilərəm?",
    "Proqramlar bölməsindən uyğun istiqaməti seçin. Proqram detalları və qeydiyyat üçün pmu.az saytına keçid edilir.",
  ],
  [
    "Videodərslərə haradan daxil olum?",
    "Videokurslar və təlim materialları üçün edu.pmo.az platformasına keçin.",
  ],
  [
    "Korporativ təlim üçün necə müraciət edim?",
    "Komandanızın ehtiyacını müraciət formasında qeyd edin və ya info@pmo.az ünvanına yazın.",
  ],
];

export default function ContactPage() {
  return (
    <main>
      <InnerHero
        active="Əlaqə"
        title={
          <>
            Gəlin, birlikdə
            <br />
            inkişaf edək.
          </>
        }
        intro="Proqram seçimi, korporativ təlim və ya konsaltinq — sizə uyğun istiqaməti birlikdə müəyyən edək."
      />
      <section className="section contact-cards">
        {contacts.map(([label, value, text]) => (
          <article className="white-card" key={label}>
            <small>{label}</small>
            <h3>{value}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="enquiry">
        <div>
          <h2>
            Müraciətinizi
            <br />
            göndərin.
          </h2>
          <p>
            Məqsədinizi və ehtiyacınızı qısa şəkildə paylaşın. Sizə uyğun proqram və ya xidmət
            haqqında əlaqə saxlayaq.
          </p>
          <p>
            Fərdi inkişaf
            <br />
            Korporativ təlim
            <br />
            Konsaltinq və əməkdaşlıq
          </p>
        </div>
        <ContactForm />
      </section>
      <section className="location">
        <div>
          <small>BAKI / AZƏRBAYCAN</small>
          <h2>
            Sizi ofisimizdə
            <br />
            gözləyirik.
          </h2>
        </div>
        <div>
          <h3>
            8 Noyabr prospekti, 25
            <br />
            Bakı Ağ Şəhər biznes mərkəzi
          </h3>
          <p>
            Bazar ertəsi – Cümə
            <br />
            09:00–18:00
          </p>
          <a>Google Maps-də aç ↗</a>
        </div>
      </section>
      <section className="section faq">
        <h2>Tez-tez verilən suallar</h2>
        {faq.map(([q, a]) => (
          <article key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
}

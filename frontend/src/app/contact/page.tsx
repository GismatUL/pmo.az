import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { getContact, getLinks } from "@/lib/api";
import { ARROW } from "@/lib/site";

export const metadata: Metadata = {
  title: "Əlaqə",
  description: "Proqram seçimi, korporativ təlim və ya konsaltinq — sizə uyğun istiqaməti birlikdə müəyyən edək.",
};

const options = (CONTACT: Awaited<ReturnType<typeof getContact>>) => [
  { label: "ZƏNG EDİN", value: CONTACT.phone, href: CONTACT.phoneHref, text: "Proqramlar və korporativ həllər haqqında danışaq." },
  { label: "BİZƏ YAZIN", value: CONTACT.email, href: `mailto:${CONTACT.email}`, text: "Müraciət və əməkdaşlıq təkliflərinizi gözləyirik." },
  { label: "İŞ SAATLARI", value: "09:00–18:00", text: "Bazar ertəsi – Cümə" },
];

const FAQ = [
  [
    "Proqrama necə qeydiyyatdan keçə bilərəm?",
    "Proqramlar bölməsindən uyğun istiqaməti seçin. Proqram detalları və qeydiyyat üçün pmu.az saytına keçid edilir.",
  ],
  ["Videodərslərə haradan daxil olum?", "Videokurslar və təlim materialları üçün edu.pmo.az platformasına keçin."],
  [
    "Korporativ təlim üçün necə müraciət edim?",
    "Komandanızın ehtiyacını müraciət formasında qeyd edin və ya info@pmo.az ünvanına yazın.",
  ],
];

export default async function ContactPage() {
  const CONTACT = await getContact();
  const OPTIONS = options(CONTACT);
  const MAPS = (await getLinks()).maps;

  return (
    <div className="inner">
      <PageHero
        crumb="Əlaqə"
        title={
          <>
            Gəlin, birlikdə
            <br />
            inkişaf edək.
          </>
        }
        intro="Proqram seçimi, korporativ təlim və ya konsaltinq — sizə uyğun istiqaməti birlikdə müəyyən edək."
      />

      {/* Contact options — 16:69 */}
      <section className="section bg-cream" aria-label="Əlaqə vasitələri">
        <div className="card-row">
          {OPTIONS.map((o) => (
            <div className="info-card" key={o.label}>
              <p className="t-label c-muted">{o.label}</p>
              {o.href ? (
                <a className="t-h2 c-ink" href={o.href}>
                  {o.value}
                </a>
              ) : (
                <p className="t-h2 c-ink">{o.value}</p>
              )}
              <p className="t-body c-muted">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry — 16:70 */}
      <section className="section bg-lime contact-enquiry" id="enquiry">
        <div className="split">
          <div className="c-ink">
            <h2 className="t-h1">
              Müraciətinizi
              <br />
              göndərin.
            </h2>
            <p className="t-body">
              Məqsədinizi və ehtiyacınızı qısa şəkildə paylaşın. Sizə uyğun proqram və ya xidmət haqqında əlaqə
              saxlayaq.
            </p>
            <ul className="t-body">
              <li>Fərdi inkişaf</li>
              <li>Korporativ təlim</li>
              <li>Konsaltinq və əməkdaşlıq</li>
            </ul>
          </div>
          <EnquiryForm source="contact" fields={["name", "email", "phone", "message"]} messagePlaceholder="Məqsədiniz və ehtiyacınız haqqında yazın" />
        </div>
      </section>

      {/* Location — 16:71 */}
      <section className="section bg-green" aria-labelledby="office">
        <div className="split split--40">
          <div>
            <p className="t-label c-lime">BAKI / AZƏRBAYCAN</p>
            <h2 className="t-h1 c-white" id="office">
              Sizi ofisimizdə
              <br />
              gözləyirik.
            </h2>
          </div>
          <div>
            <p className="t-h2 c-white">
              {CONTACT.address[0]}
              <br />
              {CONTACT.address[1]}
            </p>
            <p className="t-body c-cream">
              Bazar ertəsi – Cümə
              <br />
              09:00–18:00
            </p>
            <a className="label-link c-lime" href={MAPS} target="_blank" rel="noopener noreferrer">
              {`Google Maps-də aç${ARROW}`}
            </a>
          </div>
        </div>
      </section>

      {/* Questions — 16:72 */}
      <section className="section bg-cream" aria-labelledby="faq">
        <div className="qa-list">
          <h2 className="t-h1 c-ink" id="faq">
            Tez-tez verilən suallar
          </h2>
          {FAQ.map(([q, a]) => (
            <div className="qa" key={q}>
              <h3 className="t-h2 c-ink">{q}</h3>
              <p className="t-body c-muted">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

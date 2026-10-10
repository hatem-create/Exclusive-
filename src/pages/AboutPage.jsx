const statistics = [
  ["▦", "10.5k", "Sallers active our site"],
  ["$", "33k", "Monthly Productuct Sale"],
  ["♧", "45.5k", "Customer active in our site"],
  ["◉", "25k", "Anual gross sale in our site"],
];

const teamMembers = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "../Frame 874.png",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "../Frame 875.png",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image: "../Frame 875.png",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-breadcrumb">Home　/　About</div>
      <section className="story-intro">
        <div className="story-copy">
          <h1>Our Story</h1>
          <p>
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div
          className="story-image"
          role="img"
          aria-label="Customer shopping with a mobile phone"
        />
      </section>
      <section className="statistics" aria-label="Company statistics">
        {statistics.map(([icon, value, label], index) => (
          <article className={index === 1 ? "highlight" : ""} key={label}>
            <span className="stat-icon">{icon}</span>
            <h2>{value}</h2>
            <p>{label}</p>
          </article>
        ))}
      </section>
      <section className="team" aria-label="Our team">
        {teamMembers.map((member) => (
          <article key={member.name}>
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <div className="socials" aria-label={`${member.name} social links`}>
              ♧　◎　in
            </div>
          </article>
        ))}
      </section>
      <div className="team-dots" aria-label="Team carousel position">
        ● ● <span>●</span> ● ●
      </div>
      <section className="about-benefits">
        <div>
          ◉<b>FREE AND FAST DELIVERY</b>
          <small>Free delivery for all orders over $140</small>
        </div>
        <div>
          ◉<b>24/7 CUSTOMER SERVICE</b>
          <small>Friendly 24/7 customer support</small>
        </div>
        <div>
          ◉<b>MONEY BACK GUARANTEE</b>
          <small>We return money within 30 days</small>
        </div>
      </section>
    </div>
  );
}

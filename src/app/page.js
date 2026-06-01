import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Indy Laser Designs",
};

const categories = [
  { name: "Wood", slug: "wood", icon: "fa-tree" },
  { name: "Acrylic", slug: "acrylic", icon: "fa-cube" },
  { name: "Metal", slug: "metal", icon: "fa-cog" },
  { name: "Leather", slug: "leather", icon: "fa-bookmark" },
];

const steps = [
  {
    number: "1",
    title: "Choose a Design",
    body: "Bring us your product or a custom design idea.",
  },
  {
    number: "2",
    title: "We Engrave It",
    body: "Our laser precisely cuts and engraves your item right here in Indianapolis.",
  },
  {
    number: "3",
    title: "We Get It to You",
    body: "Once finished, we'll make sure your completed item gets back to you!",
  },
];

const testimonials = [
  {
    quote:
      "The quality is incredible — the engraving was perfectly precise. Will definitely order again!",
    name: "Sarah M.",
    rating: 5,
  },
  {
    quote:
      "Ordered custom drinkware for our wedding and it turned out better than we imagined.",
    name: "Jake & Emily R.",
    rating: 5,
  },
  {
    quote:
      "Fast shipping and amazing attention to detail. Highly recommend for any custom work.",
    name: "Tom B.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1>INDY LASER DESIGNS</h1>
        <Link href="/contact" className={styles.btnSecondary}>
          Get a Quote
        </Link>
      </section>

      <section className={styles.categories}>
        <h2>Materials We Engrave</h2>
        <div className={styles.categoryGrid}>
          {categories.map(({ name, slug, icon }) => (
            <div key={slug} className={styles.categoryCard}>
              <i className={`fa ${icon}`} />
              <span>{name}</span>
            </div>
          ))}
          {/* clickable version — uncomment when material pages are ready
          {categories.map(({ name, slug, icon }) => (
            <Link key={slug} href={`/materials/${slug}`} className={styles.categoryCard}>
              <i className={`fa ${icon}`} />
              <span>{name}</span>
            </Link>
          ))} */}
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <>
              <div key={step.number} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              {i < steps.length - 1 && <div className={styles.stepDivider} />}
            </>
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutContent}>
          <h2>Made in Indianapolis</h2>
          <p>
            Indy Laser Designs is a small, Indianapolis-based business
            specializing in custom laser engraving and cutting. Whether you need
            personalized gifts, branded merchandise, or unique home decor, we
            bring your ideas to life with precision and care.
          </p>
          <Link href="/about" className={styles.btnOutline}>
            Learn More
          </Link>
        </div>
      </section>

      {/* <section className={styles.testimonials}>
        <h2>What Our Customers Say</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map(({ quote, name, rating }) => (
            <div key={name} className={styles.testimonialCard}>
              <div className={styles.reviewStars}>
                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
              </div>
              <p>&ldquo;{quote}&rdquo;</p>
              <span>&mdash; {name}</span>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}

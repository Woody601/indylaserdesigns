import styles from "./page.module.css";
export const metadata = {
  title: "About",
};
export default function About() {
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <p>
        Indy Laser Designs was established in 2010 on the southside of
        Indianapolis. Current owners Sean & Amy Wood made Indy Laser Designs
        their own in the fall of 2018. Choosing to remain small by operating out
        of their home office, Sean and Amy are able to offer quality work to
        their customers with a personalized touch. The goal of Indy Laser
        Designs is two-fold: to help customers celebrate their special occasions
        and relationships with others, while working to build positive
        relationships with their customers by offering attentive customer
        service.
      </p>
      <p>
        Sean and Amy have been lifelong residents of Indianapolis, and their
        home office is located in Beech Grove. While Sean is an Eagle Scout and
        works full time with the Indianapolis Fire Department, Amy manages much
        of the day-to-day operations with the business. In addition to laser
        engraving, Sean and Amy are able to offer sewing and repair services
        through an additional business called PPE Care & Repair. Please feel
        free to contact them with any questions that you might have. Thank you
        for stopping by!
      </p>
    </div>
  );
}

import React from "react";
import { Card } from "antd";
import "../scss/Pros.scss";

const { Meta } = Card;

export default function Testimonials() {
  const testimonialData = [
    {
      coach: "Career Advisor",
      name: "Neha Kapoor",
      testimony:
        "Skillbanao's network connected me with mentors who guided my coaching strategies, elevating my career advisory services for clients.",
    },
    {
      coach: "Wellness Coach",
      name: "Aman Khanna",
      testimony:
        "Skillbanao allowed me to consult with nutritionists and therapists, enhancing my wellness coaching approach for a holistic client transformation.",
    },
    {
      coach: "Communication Coach",
      name: "Priya Patel",
      testimony:
        "Skillbanao provided a platform to engage with fellow communication experts, enhancing my coaching approach and helping my clients excel in every interaction.",
    },
    {
      coach: "Time Management Coach",
      name: "Pooja Sharma",
      testimony:
        "Skillbanao enabled me to exchange ideas with productivity gurus, enhancing my time management coaching approach to transform clients' personal and professional lives.",
    },
    {
      coach: "Relationship Coach",
      name: "Karan Singhania",
      testimony:
        "Skillbanao facilitated discussions with therapists and love experts, enriching my relationship coaching approach to help clients build meaningful connections.",
    },
    {
      coach: "Health and Fitness Coach",
      name: "Vikram Malik",
      testimony:
        "Skillbanao's platform introduced me to nutritionists and trainers, elevating my health coaching by providing clients with well-rounded, science-backed guidance.",
    },
    {
      coach: "Parenting Coach",
      name: "Rakesh Gupta",
      testimony:
        "Skillbanao's network enabled me to consult with child psychologists and experienced parents, enhancing my parenting coaching approach to create harmonious households.",
    },
    {
      coach: "Emotional Intelligence Coach",
      name: "Rahul Khanna",
      testimony:
        "Skillbanao's platform enabled me to consult with psychologists and EQ experts, elevating my emotional intelligence coaching to foster deeper self-awareness and empathy in clients.",
    },
  ];

  return (
    <section id="section-1">
      <div className="content-container">
        <div className="content">
          <h2 className="mt-5">Client Testimonials</h2>
          <p></p>
          <div className="pros-grid">
            {testimonialData.map((testimonial, index) => (
              <Card key={index} style={{ width: 300, marginBottom: 20 }}>
                <p>{testimonial.testimony}</p>
                <Meta
                  title={`Testimonial from ${testimonial.name}`}
                  description={`Coach: ${testimonial.coach}`}
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

import { cn } from '@/lib/utils';
import Marquee from '@/components/ui/marquee';

const testimonials = [
  {
    name: 'Jack',
    body: "Working with UTESCA was a pleasure. Their team's professionalism and ability to adapt to complex requirements were impressive. They delivered high-quality work on time.",
    logo: '/testimonials/aikomail.png',
  },
  {
    name: 'Daniel Martinovic',
    body: 'Working with the UTESCA CEP team was nothing short of incredible. Their professionalism, technical skills, and drive exceeded our expectations.',
    logo: '/testimonials/nodalli.png',
  },
  {
    name: 'Jason Ramsay',
    body: "UTESCA's students approached our project with the same rigor and commitment you'd expect from a professional consulting firm. They quickly understood our needs and delivered solutions that created lasting value for Nodalli.",
    logo: '/testimonials/nodalli.png',
  },
  {
    name: 'Daniel Martinovic',
    body: 'The team not only built a working tool but also gave us a framework for scaling our operations. Their impact is still felt in our day-to-day business.',
    logo: '/testimonials/nodalli.png',
  },
  {
    name: 'Jennifer Wang, Senior Consultant',
    body: 'These students are: The. Real. Deal.',
    logo:'/testimonials/ey.png',
  }
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const TestimonialCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative w-72 overflow-hidden rounded-xl p-4',
        'bg-card hover:bg-gray-950/[.05]',
        'flex flex-col items-center justify-center'
      )}
    >
      <blockquote className="mb-2 text-sm text-subtle font-normal text-center">{`"${body}"`}</blockquote>
      <div className="flex flex-col items-center gap-1">
        <figcaption className="text-sm font-normal text-subtle">
          — {name}
        </figcaption>
        <Image
          className="object-cover"
          width={64}
          height={32}
          alt={`${name} logo`}
          src={img}
        />
      </div>
    </figure>
  );
};

export function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            img={testimonial.logo}
            name={testimonial.name}
            body={testimonial.body}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            img={testimonial.logo}
            name={testimonial.name}
            body={testimonial.body}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

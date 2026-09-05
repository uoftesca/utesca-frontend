import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[200px] md:h-[400px] w-full overflow-hidden">
      <Image
        src="/toronto-skyline.jpg"
        alt="Toronto Skyline"
        fill
        sizes="100vw"
        priority
        className="scale-105 object-cover object-top"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-6 md:px-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none">
            {/* <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/70 md:text-sm">
              Engineering Consulting at U&nbsp;of&nbsp;T
            </p> */}
            <h1 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-white md:text-5xl">
              University of Toronto Engineering Students Consulting Association
            </h1>
            <div className="mt-5 h-1 w-16 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

// import Image from 'next/image';

// export default function Hero() {
//   return (
//     <div className="relative h-[200px] md:h-[400px] w-full overflow-hidden">
//       <Image
//         src="/toronto-skyline.jpg"
//         alt="Toronto Skyline"
//         fill
//         sizes="100vw"
//         priority={true}
//         className="object-cover object-top"
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>
//       <div className="absolute inset-0 flex items-center justify-left z-1">
//         <div className="text-white pl-8 md:pl-20">
//           <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight md:leading-tight">
//             University of Toronto
//             <br />
//             Engineering Students
//             <br />
//             Consulting Association
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// }
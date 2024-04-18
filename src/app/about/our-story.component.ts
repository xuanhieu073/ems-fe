import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'about-our-story',
  template: `
    <div class="grid grid-cols-2 gap-x-16 container">
      <img
        src="assets/images/commerce/hero.jpeg"
        alt="our story"
        class="w-full rounded-md h-[500px] object-cover"
      />
      <div class="flex flex-col gap-8">
        <div>
          <h2 class="text-[#102a42] text-4xl font-bold mb-3">Our Story</h2>
          <div class="w-24 h-1 bg-[#ab7a5f]"></div>
        </div>
        <p class="text-[#617d98] leading-8 tracking-wide">
          Hello! Welcome. We’re so glad you’re here. You can find us — the
          Target Team — at your favorite store, in your community, across the
          country and around the world. There are more than 400,000 team members
          across the globe, all working together for one important reason… To
          help all families discover the joy of everyday life. That’s our
          purpose. Our mission. The promise of surprises, fun, ease and
          inspiration at every turn, no matter when, where or how you shop. That
          quest to bring joy is at the center of every business decision we
          make. It gets our teams excited to come to work each day. And we bring
          it to life in so many ways. We’re dedicated to being a good neighbor
          and working with our communities and partners to make life a little
          better everywhere we do business. Come on in and take a look around!
        </p>
      </div>
    </div>
  `,
})
export class OurStoryComponent {}

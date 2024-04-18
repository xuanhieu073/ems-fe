import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'home-reach-out-form',
  template: `
    <div class="mb-[240px] max-w-[1170px] mx-auto">
      <h3 class="text-3xl font-bold text-[#102a42] mb-8">
        Join our newsletter and get 20% off
      </h3>
      <div class="grid grid-cols-2 gap-[128px]">
        <p class="text-sm text-[#617d98]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum veniam
          repudiandae vel ab id, fuga praesentium nobis natus ipsam vero?
        </p>
        <div class="flex">
          <input
            type="text"
            class="flex-1 rounded-l-[4px] border-r-0 border-[2px] border-black leading-[20px]"
          />
          <button
            class="border-black border-[2px] px-4 py-2 bg-[#ab7a5f] text-sm rounded-r-[4px] text-[#222222] font-medium transition-colors duration-500 hover:text-teal-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ReachOutFormComponent {}

import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'home-articles',
  template: `
    <section class="pt-20 bg-[#eaded7] mb-[184px]">
      <div class="max-w-[1170px] mx-auto">
        <div class="grid grid-cols-2 mb-24">
          <h3 class="font-bold text-3xl tracking-[1.6] text-[#453227]">
            Custom Furniture <br />
            Built Only For You
          </h3>
          <p class="text-sm text-[#795744]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            quisquam saepe id reiciendis sunt, repudiandae libero amet rem quia
            quod?s
          </p>
        </div>
        <div class="grid grid-cols-3 gap-10">
          @for(article of articles; track article.title) {

          <div
            class="bg-[#c5a491] rounded-md flex flex-col items-center px-8 py-10 -mb-24"
          >
            <span
              class="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#eaded7]"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
              >
                <path
                  d="M203.97 23l-18.032 4.844 11.656 43.468c-25.837 8.076-50.32 21.653-71.594 40.75L94.53 80.594l-13.218 13.22 31.376 31.374c-19.467 21.125-33.414 45.53-41.813 71.343l-42.313-11.343-4.843 18.063 42.25 11.313c-6.057 27.3-6.157 55.656-.345 83L23.72 308.78l4.843 18.064 41.812-11.22c6.693 21.225 17.114 41.525 31.25 59.876l-29.97 52.688-16.81 29.593 29.56-16.842 52.657-29.97c18.41 14.216 38.784 24.69 60.094 31.407l-11.22 41.844 18.033 4.81 11.218-41.905c27.345 5.808 55.698 5.686 83-.375l11.312 42.28 18.063-4.81-11.344-42.376c25.812-8.4 50.217-22.315 71.342-41.78l31.375 31.373 13.22-13.218-31.47-31.47c19.09-21.266 32.643-45.738 40.72-71.563l43.53 11.657 4.813-18.063-43.625-11.686c5.68-27.044 5.576-55.06-.344-82.063l43.97-11.78-4.813-18.063L440.908 197c-6.73-20.866-17.08-40.79-31.032-58.844l29.97-52.656 16.842-29.563-29.593 16.844-52.656 29.97c-17.998-13.875-37.874-24.198-58.657-30.906l11.783-44L309.5 23l-11.78 43.97c-27-5.925-55.02-6.05-82.064-.376L203.97 23zm201.56 85L297.25 298.313l-.75.437-40.844-40.875-148.72 148.72-2.186 1.25 109.125-191.75 41.78 41.78L405.532 108zm-149.686 10.594c21.858 0 43.717 5.166 63.594 15.47l-116.625 66.342-2.22 1.28-1.28 2.22-66.25 116.406c-26.942-52.04-18.616-117.603 25.03-161.25 26.99-26.988 62.38-40.468 97.75-40.468zm122.72 74.594c26.994 52.054 18.67 117.672-25.002 161.343-43.66 43.662-109.263 52.005-161.312 25.033l116.438-66.282 2.25-1.25 1.25-2.25 66.375-116.592z"
                ></path>
              </svg>
            </span>
            <h4 class="mb-3 text-xl font-bold text-[#453227] tracking-[2px]">
              {{ article.title }}
            </h4>
            <p class="text-center leading-7 text-[#5f4435] text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ArticlesComponent {
  articles = [{ title: 'Mission' }, { title: 'Vision' }, { title: 'Hítory' }];
}

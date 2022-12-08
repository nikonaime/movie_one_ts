let apiKey: string = "195f02c6";
let apiUrl: string = "https://www.omdbapi.com/?apikey=" + apiKey;

interface movieInterface {
  Year: string;
  Actors: string;
  Country: string;
  Runtime: string;
}

type myCountryType = {
  currencies: { name: string; symbol: string }[];
  population: number;
  name: { common: string };
  cca2: string;
}[];

const movieIput = document.getElementById("movie") as HTMLInputElement | null;
const btn: HTMLButtonElement | null = document.querySelector("button");

const fetchMovies = (): Promise<movieInterface> =>
  fetch(apiUrl + "&t=" + movieIput?.value).then((res) => res.json());

const fetchCountries = (country: string): Promise<myCountryType> =>
  fetch("https://restcountries.com/v3.1/name/" + country).then((res) =>
    res.json()
  );

function addImage(country: string): void {
  var img: HTMLImageElement = document.createElement("img");
  img.src = "https://flagpedia.net/data/flags/icon/36x27/" + country + ".png";
  document
    ?.getElementById("menuSix")
    ?.appendChild(createMenuItem(""))
    .appendChild(img);
}

function createMenuItem(name: string): HTMLLIElement {
  let li: HTMLLIElement = document.createElement("li");
  li.textContent = name;
  return li;
}

function extractFirstName(names: string): string {
  const arr: string[] = names
    .split(",")
    .map((element) => element.trim().split(" ")[0]);
  return arr.toString();
}

btn?.addEventListener("click", function () {
  fetchMovies().then((data) => {
    if (data) {
      console.log("This is the movie: ");
      console.log(data);
      console.log("These are the actors (full names): ");
      console.log(data.Actors);

      const countrrr: Array<string> = data.Country.split(",").map(
        (element) => element.trim().split(",")[0]
      );

      console.log("These are the countries in which this was made: ");
      console.log(countrrr);
      countrrr.forEach((element: string) => {
        fetchCountries(element).then((datas) => {
          datas
            .filter((i) => i.name.common === element)
            .forEach((n) => {
              menuThree?.appendChild(createMenuItem(n.name.common));
              Object.entries(n.currencies).map(([key, val]) => {
                menuFour?.appendChild(createMenuItem(val.name));
                menuFive?.appendChild(createMenuItem(val.symbol));
                addImage(n.cca2.toString().toLowerCase());
              });
            });
        });
      });

      const menu = document.querySelector("#menu");
      menu?.appendChild(createMenuItem(data.Year));

      const menuTwo = document.querySelector("#menuTwo");
      menuTwo?.appendChild(createMenuItem(extractFirstName(data.Actors)));

      const menuThree = document.querySelector("#menuThree");
      const menuFour = document.querySelector("#menuFour");
      const menuFive = document.querySelector("#menuFive");
    }
  });
});

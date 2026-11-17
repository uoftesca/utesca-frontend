/**
 * Team notebook configuration for the Meet the Team page.
 *
 * Each team renders as its own flippable notebook, in the order listed here.
 * Pages render in array order; the first page is the notebook's cover.
 *
 * Images live in /public/team-notebooks/<team-id>/<n>.png (copied from the
 * Canva exports in /notebook). To add a team, drop its PNGs into a new folder
 * there and add an entry below. To reorder pages, reorder the `pages` array.
 */

export interface NotebookPage {
  /** Path relative to /public. */
  src: string;
  /** Describes what's on the page for screen-reader users. */
  alt: string;
}

export interface TeamNotebookConfig {
  /** URL-safe id; also used as the asset folder name and the heading anchor. */
  id: string;
  /** Heading shown above the notebook. */
  name: string;
  /** Optional handwritten annotation shown beside the notebook. */
  note?: string;
  pages: NotebookPage[];
}

/** Natural pixel size of every Canva export (4:5 portrait). */
export const PAGE_WIDTH = 1080;
export const PAGE_HEIGHT = 1350;

const page = (teamId: string, n: number, alt: string): NotebookPage => ({
  src: `/team-notebooks/${teamId}/${n}.png`,
  alt,
});

export const TEAM_NOTEBOOKS: TeamNotebookConfig[] = [
  {
    id: "presidents",
    name: "Presidents",
    note: "the people steering the ship ✶",
    pages: [
      page("presidents", 1, "Co-Presidents 2026-27 cover with photos of Clemen Chan and Carolina Fischmeister."),
      page("presidents", 2, "Clemen Chan, Co-President, with discipline, fun fact and favourite UTESCA moment."),
      page("presidents", 3, "Carolina Fischmeister, Co-President, with discipline, fun fact and favourite UTESCA moment."),
    ],
  },
  {
    id: "outreach-marketing",
    name: "Outreach & Marketing",
    note: "the faces behind every post & partnership",
    pages: [
      page("outreach-marketing", 1, "Outreach and Marketing 2026-27 cover with photos of the team's VPs."),
      page("outreach-marketing", 2, "Johnny Campos, VP Outreach, with discipline, fun fact and favourite UTESCA moment."),
      page("outreach-marketing", 3, "Outreach directors Connor Andjelic, Ethan Xu and King (Johnson) Hung, with their disciplines and fun facts."),
      page("outreach-marketing", 4, "Coralyn Zhong, VP Marketing, with discipline and favourite UTESCA moment."),
      page("outreach-marketing", 5, "Marketing directors Mia Halim and Shirly Tian, with their disciplines and fun facts."),
    ],
  },
  {
    id: "events-oia",
    name: "Events and O&IA",
    note: "the crew behind every event",
    pages: [
      page("events-oia", 1, "Events and O&IA 2026-27 cover with photos of the team's VPs."),
      page("events-oia", 2, "Amiran Sultana, VP Events, with discipline, fun fact and favourite UTESCA moment."),
      page("events-oia", 3, "Events directors Daniel Ortiz and Natalie El Taki, with their disciplines and fun facts."),
      page("events-oia", 4, "Events directors Baran Askarifirouzjaee and Devanshi Makkar, with their disciplines, fun facts and favourite moments."),
      page("events-oia", 5, "Henry Chung, VP O&IA, with discipline, fun fact and favourite UTESCA moment."),
      page("events-oia", 6, "O&IA directors Cara Ng and Karma Namgyal, with their disciplines and fun facts."),
      page("events-oia", 7, "O&IA directors Naufal As Shodiq and Bruno Velázquez (also part of Outreach), with their disciplines, fun facts and favourite moments."),
    ],
  },
  {
    id: "web",
    name: "Web Development",
    note: "psst… they built this page :)",
    pages: [
      page("web", 1, "Web Development 2026-27 cover with a photo of the team's VP."),
      page("web", 2, "Muhtasim Khan, VP Web, with discipline, fun fact and favourite UTESCA moment."),
      page("web", 3, "Developers Sebastian Cooper-Giannotta, Preston Cai and Maha Jamil, with their disciplines and fun facts."),
      page("web", 4, "Ayaan Islam, Senior Developer, and Shaurya Sareen, System Architect, with their disciplines and fun facts."),
      page("web", 5, "Managers Niki Bidhendi and Zoya Khan, for Project and Technical Product, with their disciplines and fun facts."),
    ],
  },
  {
    id: "cep",
    name: "Consulting Engineering Program",
    note: "where engineering meets consulting",
    pages: [
      page("cep", 1, "Consulting Engineering Program 2026-27 cover with a photo of the team's VP."),
      page("cep", 2, "Joel Vadakken, VP CEP, with discipline, fun fact and favourite UTESCA moment."),
      page("cep", 3, "CEP directors Nolan Cheung and Erfan Nazarian, with their disciplines, fun facts and favourite moments."),
      page("cep", 4, "CEP directors Artin Molaei-Forouhar and Mai Fujii, with their disciplines and fun facts."),
      page("cep", 5, "CEP directors Meha Raina and Syed Ali Sher, with their disciplines and fun facts."),
      page("cep", 6, "CEP directors Anastasia Ayow and Ryan Gill, with their disciplines, fun facts and favourite moments."),
      page("cep", 7, "CEP directors Ibrahim Yafawi and Chenyu Li, with their disciplines, fun facts and favourite moments."),
    ],
  },
  {
    id: "finance",
    name: "Finance",
    note: "keeping UTESCA running behind the scenes",
    pages: [
      page("finance", 1, "Finance 2026-27 cover with a photo of the team's VP."),
      page("finance", 2, "Rangajah Manoharan, VP Finance, with discipline, fun fact and favourite UTESCA moment."),
      page("finance", 3, "Finance directors Imaan Sheikh and Taimour Rehan, with their disciplines."),
    ],
  },
];

// Research notes data. Separate from the blog: research notes are long-form
// research writing, not blog posts. To add a note, append a new entry with a
// unique id, title, date (ISO string, publication date), tags, byline, and
// blocks of content.
// Block types: { type: 'p', text }, { type: 'h2', text },
// { type: 'quote', text }, { type: 'code', language, text }
// Inline links: [text](https://url)

export const researchNotes = [
  {
    id: 'pura-battery-note',
    title: 'Zinc-Air Batteries for Aviation and Graphene-Coated NiMH Anodes',
    date: '2026-11-24',
    tags: ['research', 'batteries'],
    excerpt:
      "Zinc-air batteries for electric aviation and a graphene-coated NiMH anode, from a semester in Dr. Nian Liu's lab at Georgia Tech.",
    byline:
      "Namkhang Le · Undergraduate research note · Liu Lab, Georgia Tech, Fall 2021 · Supported by a President's Undergraduate Research Award (PURA)",
    blocks: [
      {
        type: 'quote',
        text: "Written in Fall 2021 during a semester in Dr. Nian Liu's lab. The citation numbers in the text refer to sources from the original draft; the reference list was not preserved. Figure 1a, referenced in the NiMH section, is not included.",
      },
      {
        type: 'p',
        text: "The aviation industry alone produces over 900 million metric tons of carbon dioxide 1 each year, and as its dependence on hydrocarbon fuels continues to increase and will continue to skyrocket as demand takes off.  Furthermore, accounting for more than 4% of the global GHG emissions 2 and number that is correspondingly set to become more prominent as flight travel is set to double every 15 years. As replacements for more traditional sources of propulsion are being developed, electric batteries remain the key factor in revolutionizing air travel as we know it. However, the largest obstacle in this transition lies in the limited power density of modern-day battery technology. At its core, airplanes require a high concentration of usable energy, commonly found in the form of chemical energy from jet fuels, while remaining as light as humanly possible. As such, the research being performed on metal-air batteries has shown promising results, more specifically, zinc-air batteries (ZABs). Zinc-air batteries, being known for their low cost, are highly safe, environmentally friendly, and most importantly, have an extremely high energy density. 3 This unparalleled power density not only allows for the potential of a jet fuel substitute but also becomes crucial during the take-off and landing sequences of these aircraft which happen to be the highest point of fuel usage. 4 These benefits from zinc-air batteries alone are perpetuated upon the introduction of dissolved Ag to form a solid-solution surface layer. This introduction of Ag not only serves as a buffer layer for subsequent Zn deposition, has an identical crystal structure to that of pure Zn metal, but also eliminates the nucleation barrier.",
      },
      {
        type: 'p',
        text: "Nickel-metal hydride (NiMH) batteries have been an essential part of our world's energy storage needs since their commercialization over 30 years ago. Although NiMH has a lower specific energy density than lithium-ion batteries (LIB), it is a much more viable choice for processes where a safer form of energy storage is required 1, as the aqueous electrolyte present in NiMH is non-flammable. This property makes them a much more practical solution for electric and hybrid vehicles. NiMH's significance on our society as the EV and other markets expand is substantial, so furthering the technology by extending its cycle life and kinetics at low temperatures is imperative. As shown in Figure 1a, over the lifespan of the battery, a pristine AB5 alloy anode creates layers of AB5 oxide and fractured particles that produce \"needles\" 2 that while do increase the kinetics of the redox reaction of the battery, limit the mass and electron transfer to the bulk of the anode alloy. Such limitations make the alloy anode the performance-constraining component of NiMH batteries 3. To increase the electrochemical performance of the anode, modifications to these surface layers, such as electroless deposition of nickel 4 and copper 5, or by polyaniline 6, or amorphous carbon 7 coating, have been proven to increase rate capability and capacity. Chemically treating the cell's surface through alkaline treatment 8 or sulfurization 9 has also demonstrated improvements in reducing the intrinsic resistance of the battery, and therefore electrochemical performance.",
      },
      {
        type: 'p',
        text: "In the mix of these treatments to the surface of the anode comes another candidate, graphene coating (AB5@graphene). Previous research has shown that epitaxially growing graphene on the surface of a LIB silicon anode is an effective method to retain the fractured particles to the surface of the anode alloy bulk while maintaining high Coulombic efficiencies, further improving the electrochemical performance of the battery 10.",
      },
    ],
  },
];

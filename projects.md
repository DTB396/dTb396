---
layout: default
title: "Projects"
description: "Pinned links and categorized items across business, mission, tools, and ideas."
permalink: /projects/
---

{% assign links = site.data.links %}

<section class="container">
  <div class="section__head">
    <h1 class="section__title">Projects</h1>
    <p class="section__blurb">Pinned links plus categorized items—driven from <code>/_data/links.yml</code>.</p>
  </div>

  <div class="section" id="pinned">
    <div class="section__head">
      <h2 class="section__title">Pinned</h2>
      <p class="section__blurb">Primary destinations and active public work.</p>
    </div>
    <div class="grid">
      {% for item in links.pinned %}
        {% include link-card.html item=item %}
      {% endfor %}
    </div>
  </div>

  <div class="stack" style="margin-top:18px;">
    {% for s in links.sections %}
      {% include section.html section=s %}
    {% endfor %}
  </div>
</section>

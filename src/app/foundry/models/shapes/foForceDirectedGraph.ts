import { EventEmitter } from '@angular/core';
import { foShape2D } from './foShape2D.model';
import { foShape1D } from './foShape1D.model';

import * as fs from '../force';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
};

export class ForceDirectedGraph {
  public ticker: EventEmitter<fs.forceSimulation<any, any>> = new EventEmitter();
  public simulation: fs.forceSimulation<any, any>;

  public nodes: foShape2D[] = [];
  public links: foShape1D[] = [];

  constructor(nodes, links, options: { width; height }) {
    this.nodes = nodes;
    this.links = links;

    this.initSimulation(options);
  }

  connectNodes(source: foShape2D, target: foShape2D) {
    let link = new foShape1D({ source, target });
    this.simulation.stop();
    this.links.push(link);
    this.simulation.alphaTarget(0.3).restart();

    this.initLinks();
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force('links',
      fs.forceLink(this.links)
        .id(item => item['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = fs.forceSimulation()
        .force('charge', fs.forceManyBody().strength(item => FORCES.CHARGE * item['r']))
        .force('collide', fs.forceCollide()
            .strength(FORCES.COLLISION)
            .radius(item => item['r'] + 5)
            .iterations(2)
        );

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function() {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force('centers', fs.forceCenter(options.width / 2, options.height / 2));

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}

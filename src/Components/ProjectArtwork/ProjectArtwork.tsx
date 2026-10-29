import { ArrowUpRight, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import type { ProjectVisual } from '../../Data/PortfolioData';
import { ShowcaseVisual } from '../ShowcaseVisual/ShowcaseVisual';
import styles from './projectArtwork.module.css';

interface ProjectArtworkProps {
  variant: ProjectVisual;
}

// These illustrations represent each business sector; they are not website screenshots.
export function ProjectArtwork({ variant }: ProjectArtworkProps) {
  if (variant === 'salon' || variant === 'academy' || variant === 'tattoo') {
    return <ShowcaseVisual variant={variant} />;
  }

  if (variant === 'burger') {
    return (
      <div className={styles.frame} aria-hidden="true">
        <div className={styles.browserBar}>
          <div className={styles.dots}><i/><i/><i/></div>
          <span>blend-burger-demo.vercel.app</span>
        </div>
        <div className={styles.burgerCanvas}>
          <div className={styles.burgerNavigation}><b>BLEND<span>.</span></b><span>MENU&nbsp;&nbsp; / &nbsp;&nbsp;ABOUT</span></div>
          <div className={styles.burgerCopy}><small>SMASH BURGER CULTURE</small><strong>GOOD FOOD.<br/>NO RULES.</strong><span>BURGERS / FRIES / MORE</span></div>
          <div className={styles.burgerArt}>
            <i className={styles.bunTop}/><i className={styles.lettuce}/><i className={styles.cheese}/><i className={styles.patty}/><i className={styles.bunBottom}/>
          </div>
          <div className={styles.burgerFoot}><span>FRESHLY MADE</span><ArrowUpRight size={16}/></div>
        </div>
      </div>
    );
  }

  if (variant === 'store') {
    return (
      <div className={styles.frame} aria-hidden="true">
        <div className={styles.browserBar}>
          <div className={styles.dots}><i/><i/><i/></div>
          <span>dummy-data-tawny-three.vercel.app</span>
        </div>
        <div className={styles.storeCanvas}>
          <div className={styles.storeNavigation}><b>STORE<span> / </span>DATA</b><ShoppingBag size={16}/></div>
          <div className={styles.storeHeadline}><span>THE COLLECTION / 001</span><strong>Everyday essentials.</strong></div>
          <div className={styles.storeProducts}>
            <div><i className={styles.storeProductOne}/><span>OBJECT / 001</span><b>Collection</b></div>
            <div><i className={styles.storeProductTwo}/><span>OBJECT / 002</span><b>Selection</b></div>
            <div><i className={styles.storeProductThree}/><span>OBJECT / 003</span><b>Edition</b></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={styles.browserBar}>
        <div className={styles.dots}><i/><i/><i/></div>
        <span>restaurant-demo-iota-taupe.vercel.app</span>
      </div>
      <div className={styles.restaurantCanvas}>
        <div className={styles.restaurantNavigation}><span>MAISON</span><UtensilsCrossed size={16}/></div>
        <div className={styles.restaurantCircle}><div className={styles.restaurantPlate}><i/><i/><i/></div></div>
        <div className={styles.restaurantCopy}><span>THE ART OF DINING</span><strong>Maison Aster</strong><small>UNE EXPÉRIENCE SINGULIÈRE</small></div>
        <div className={styles.restaurantBottom}><span>CUISINE · ATMOSPHERE · MOMENTS</span><ArrowUpRight size={14}/></div>
      </div>
    </div>
  );
}

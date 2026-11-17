'use client';

import { useEffect } from 'react';

export default function Reveal() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('a.bg-brand, button.bg-brand').forEach((node) => node.classList.add('btn-lift'));
    document.querySelectorAll<HTMLElement>('main section li, main section article, main section figure').forEach((node, index) => {
      if (node.closest('#learning')) return;
      node.classList.add('reveal');
      node.style.transitionDelay = `${(index % 6) * 60}ms`;
    });
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
  return null;
}

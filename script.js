document.addEventListener('DOMContentLoaded',()=>{
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
    }),{threshold:.12});
    items.forEach(item=>observer.observe(item));
  }else{items.forEach(item=>item.classList.add('visible'))}

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced){
    document.querySelectorAll('a[href]').forEach(link=>{
      const href=link.getAttribute('href');
      if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') ||
         link.target==='_blank' || link.hasAttribute('download')) return;
      const url=new URL(link.href,window.location.href);
      if(url.origin!==window.location.origin || !/\.html?$/.test(url.pathname)) return;
      link.addEventListener('click',event=>{
        if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey) return;
        event.preventDefault();
        document.body.classList.add('page-leaving');
        window.setTimeout(()=>{window.location.href=url.href},420);
      });
    });
  }

  const form=document.getElementById('enquiry-form');
  if(!form)return;
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const body=[
      'New CRIMSYN CONSULTING website enquiry','',
      'Name: '+data.get('name'),'Business email: '+data.get('email'),
      'Organisation: '+data.get('organisation'),'Service: '+data.get('service'),
      'Seniority / role category: '+data.get('seniority'),'Expected timeline: '+data.get('timeline'),
      'Requirement details: '+(data.get('details')||'Not provided')
    ].join('\n');
    const mailto='mailto:info@crimsynconsulting.com?subject='+encodeURIComponent('CRIMSYN CONSULTING — Hiring Requirement')+'&body='+encodeURIComponent(body);
    document.getElementById('form-message').textContent='Your email application will open with the details filled in. Please review and send it to submit your enquiry.';
    window.location.href=mailto;
  });
});

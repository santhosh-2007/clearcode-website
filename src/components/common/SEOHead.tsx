import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'ClearCode.dev — Modern Web Development Studio',
  description = 'We design and develop modern, responsive websites that help businesses establish their digital presence and grow online.',
}) => {
  useEffect(() => {
    document.title = title.includes('ClearCode.dev') ? title : `${title} | ClearCode.dev`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};

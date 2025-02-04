'use client';

import { Icon } from '@iconify/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './FormSearch.module.scss';

export default function FormSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [keywords, setKeywords] = useState(searchParams.get('keywords') ?? '');

  const handleSearch = () => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('keywords', keywords);

    // update the URL with the new keywords
    router.push(`/?${query.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // search when the user presses Enter
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="search"
        name="keywords"
        placeholder="Enter restaurant name..."
        className={styles['search__input']}
        value={keywords}
        data-testid="searchbox"
        onChange={(e) => setKeywords(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        aria-label="Search"
        data-testid="search-button"
        className={styles['search__button']}
        onClick={handleSearch}
      >
        <Icon icon={'mdi:magnify'} />
      </button>
    </div>
  );
}

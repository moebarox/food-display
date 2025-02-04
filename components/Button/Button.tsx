import styles from './Button.module.scss';

export default function Button({
  onClick,
  isLoading,
  children,
}: {
  onClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button className={styles.button} disabled={isLoading} onClick={onClick}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

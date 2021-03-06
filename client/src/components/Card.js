// @flow

/**
 * @fileoverview Component responsible for rendering a card, with a header and a body for textual content.
 * Should also contain a toolbar, which allows users to both edit or delete.
 */
import * as React from 'react';
import { Icon } from 'react-materialize';
import styles from './Card.module.scss';

type Props = {
  children: React.Element<any>,
  avatar: string,
  avatarAlt: string,
  onEdit(): void,
  onDelete(): void
};

export default ({ children, avatar, avatarAlt, onEdit, onDelete }: Props) => {
  return (
    <section className={styles.card}>

      {/* Buttons toolbar (vertical, absolute position) */}
      <div className={styles.toolbar}>
        <span className={styles.btn} onClick={onEdit}><Icon onClick={onEdit} small>edit</Icon></span>
        <span className={styles.btn} onClick={onDelete}><Icon onClick={onEdit} small>delete</Icon></span>
      </div>

      {/* Header */}
      <header className={styles.cardHeader}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} alt={avatarAlt} src={avatar} />
        </div>
      </header>

      {/* Separator */}
      <hr className={styles.separator} />

      {/* Body */}
      <article className={styles.content}>
        {children}
      </article>
    </section>
  );
};
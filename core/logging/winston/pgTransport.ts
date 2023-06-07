import db from 'db/index';
import _ from 'lodash';
import Transport, { TransportStreamOptions } from 'winston-transport';

interface PgTransportOptions extends TransportStreamOptions {
  name?: string;
  level?: string;
  db?: any;
  tableName?: string;
}

export default class PgTransport extends Transport {
  name: string;
  db: any;
  tableName: string;

  constructor(options: PgTransportOptions = {}) {
    super(options);

    this.name = options?.name || 'Postgres';
    this.level = options?.level || 'info';

    this.silent = options.silent || false;
    this.db = options.db || db;
    this.tableName = options.tableName || 'TransactionLog';
  }

  log(info: any, callback: () => any) {
    const { level, message: messageRaw, data = {}, label: labelRaw } = info;
    let message, label;

    if (!callback) {
      callback = () => {};
    }

    if (_.isString(messageRaw)) {
      message = messageRaw;
      label = labelRaw ?? messageRaw;
    } else {
      message = JSON.stringify(messageRaw);
      label = labelRaw ? labelRaw : messageRaw?.label || '';
    }

    this.db[this.tableName].create({
      level,
      message,
      data,
      label,
      server: 'esm',
    });

    callback();
  }
}

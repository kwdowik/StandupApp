'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hooks = require('./lib/utils/hooks');

var _moment = require('./lib/moment/moment');

var _calendar = require('./lib/moment/calendar');

var _locale = require('./lib/locale/locale');

var _duration = require('./lib/duration/duration');

var _units = require('./lib/units/units');

var _isDate = require('./lib/utils/is-date');

var _isDate2 = _interopRequireDefault(_isDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_hooks.hooks.version = '2.19.1'; //! moment.js
//! version : 2.19.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(0, _hooks.setHookCallback)(_moment.createLocal);

_hooks.hooks.fn = _moment.momentPrototype;
_hooks.hooks.min = _moment.min;
_hooks.hooks.max = _moment.max;
_hooks.hooks.now = _moment.now;
_hooks.hooks.utc = _moment.createUTC;
_hooks.hooks.unix = _moment.createUnix;
_hooks.hooks.months = _locale.listMonths;
_hooks.hooks.isDate = _isDate2.default;
_hooks.hooks.locale = _locale.getSetGlobalLocale;
_hooks.hooks.invalid = _moment.createInvalid;
_hooks.hooks.duration = _duration.createDuration;
_hooks.hooks.isMoment = _moment.isMoment;
_hooks.hooks.weekdays = _locale.listWeekdays;
_hooks.hooks.parseZone = _moment.createInZone;
_hooks.hooks.localeData = _locale.getLocale;
_hooks.hooks.isDuration = _duration.isDuration;
_hooks.hooks.monthsShort = _locale.listMonthsShort;
_hooks.hooks.weekdaysMin = _locale.listWeekdaysMin;
_hooks.hooks.defineLocale = _locale.defineLocale;
_hooks.hooks.updateLocale = _locale.updateLocale;
_hooks.hooks.locales = _locale.listLocales;
_hooks.hooks.weekdaysShort = _locale.listWeekdaysShort;
_hooks.hooks.normalizeUnits = _units.normalizeUnits;
_hooks.hooks.relativeTimeRounding = _duration.getSetRelativeTimeRounding;
_hooks.hooks.relativeTimeThreshold = _duration.getSetRelativeTimeThreshold;
_hooks.hooks.calendarFormat = _calendar.getCalendarFormat;
_hooks.hooks.prototype = _moment.momentPrototype;

exports.default = _hooks.hooks;
//# sourceMappingURL=moment.js.map
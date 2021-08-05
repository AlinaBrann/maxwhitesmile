<template>
  <div class="table_holder">
    <div class="table">
      <div class="table__inner">
        <table>
          <thead>
            <tr>
              <th v-for="(item, index) in thead" :key="index">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <slot name="tbody"></slot>
          </tbody>
        </table>
      </div>
    </div>
    <slot name="mobile"></slot>
  </div>
</template>

<script>
import $ from "jquery";
import jQuery from "jquery";

export default {
  props: ["thead"],
};
</script>

<style lang="scss">
.table_holder {
  overflow: auto;

  td.status-bad {
    color: #912982;
  }
  td.status-moderation {
    color: #fff;
  }
  .error_icon {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    width: rem(17px);
    height: rem(17px);
    font-size: rem(12px);
    background: #ffffff;
    box-shadow: 0px 0px 4px rgba(1, 63, 93, 0.15);
    border-radius: 50%;
  }
}
.table {
  max-width: rem(356px);
  width: 100%;
  margin: 0 auto;
  &__inner {
    max-height: rem(330px);
    padding-right: rem(10px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba(#c5c5c5, 0.3);
      border-radius: 0px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: $pink;
      transition: all 0.3s ease-in-out;
    }
  }
  table {
    width: 100%;
  }

  th {
    padding: 0 rem(10px) rem(17px);
    font-size: rem(14px);
    text-align: left;
    font-family: "Bold";
    color: #000;
    &:first-child {
      width: 20%;
    }
    &:nth-child(2) {
      text-align: center;
    }
    &:last-child {
      width: 45%;
    }
  }

  td {
    font-size: rem(14px);
    padding: rem(9px) rem(10px);
    &:first-child {
      width: 20%;
    }
    &:last-child {
      width: 45%;
      text-align: left;
    }
    svg {
      margin: auto;
    }
    &._clickable {
      cursor: pointer;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid rgba(#303030, 0.2);
      color: #a5a5a5;
      path {
        fill: #a5a5a5;
      }
      &._not-accepted {
        color: #f90025;
        path {
          fill: #f90025;
        }
      }
      &._accepted {
        color: #000;
        path {
          fill: #000;
        }
      }
      &._received {
        color: #209524;
        path {
          fill: #209524;
        }
      }
    }
  }

  @media (min-width: $sm) {
    &__inner {
      max-height: rem(300px);
      padding-right: rem(30px);
    }
  }
}

.mobile_table {
  display: none;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }

  table {
    width: 100%;
  }

  tr:nth-child(odd) {
    background: rgba(145, 41, 130, 0.3);
  }
  tr:nth-child(even) {
    background: rgba($color: #912982, $alpha: 0.5);
  }
  td {
    min-height: 40px;
    padding: 9px 14px;
    border-right: 3px dashed #ffffff;
    font-size: 14px;
  }

  td:last-child {
    border-right: 0;
  }

  @media (max-width: 767px) {
    display: block;

    .error_icon {
      width: 20px;
      height: 20px;
      margin-left: 6px;
    }
  }
}
</style>

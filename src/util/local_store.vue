
<script>
export default {
  // 在Storage设置值
    setContextDataInLocalStorage: function (key, value) {
      if (typeof value == "string") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
// 从StorageStorage取值
    getContextDataLocalStorage: function (key) {
      const str = localStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return null;
    },
  deleteContextDataInDataStorage: function (key) {
      localStorage.removeItem(key);
  }
}

</script>

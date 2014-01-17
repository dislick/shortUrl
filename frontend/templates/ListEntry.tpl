<script type="text/template" id="ListEntry">
  <td id="checkbox" class="clickable">
    <input type="checkbox" class="check" value="None" name="check" <%= (marked) ? 'checked' : '' %> />
  </td>
  <td id="longUrl" class="clickable">
    <a href="<%= url %>" target="empty">
      <%= displayUrl %>
    </a>
  </td>
  <td class="clickable" id="dateString"><%= dateString %></td>
  <td class="clickable"><%= clicks %></td>
  <td>
    <input type="text" readonly="true" class="copy" value="<%= redirectUrl %>" spellcheck="false" />
    <div class="copy-note" style="margin-left: 150px"><div class="arrow"></div>Press Ctrl-C to copy</div>
  </td>
</script>
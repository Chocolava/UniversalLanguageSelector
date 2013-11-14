Then(/^I see "(.*?)" as the name of the content language$/) do |text|
	@browser.span(:text => "#{text}").should be_visible
end

When(/^I open the Universal Language Selector$/) do
	on(PanelPage).trigger_personal_element.when_visible.click
end

When(/^I open Display panel of language settings$/) do
	on(PanelPage).panel_display_element.when_visible.click
end

When(/^I open Language panel of language settings$/) do
	on(PanelPage).panel_language_element.click
end

When(/^I open Fonts panel of language settings$/) do
	on(PanelPage).panel_fonts_element.click
end

When(/^I select (.*?) font for the interface language for the live preview$/) do |font|
	on(PanelPage).font_for_interface = font
end

When(/^I select (.*?) font for the content language for the live preview$/) do |font|
	on(PanelPage).font_for_content = font
end

When(/^I close the panel to discard the changes$/) do
	on(PanelPage).panel_button_close_element.click
end

When(/^I apply the changes$/) do
	on(PanelPage).panel_button_apply_element.click
end

Then(/^I can disable input methods$/) do
	on(PanelPage).panel_disable_input_methods_element.click
end

Then(/^I can enable input methods$/) do
	on(PanelPage).panel_enable_input_methods_element.click
end

Then(/^a font selector for interface language appears$/) do
  on(PanelPage).panel_interface_font_selector_element.should be_visible
end

Then(/^a font selector for content language appears$/) do
  on(PanelPage).panel_content_font_selector_element.should be_visible
end

When(/^I use the panel to change my interface language to "(.*?)"$/) do |language|
	code = on(PanelPage).language_to_code(language)
	on(IMEPage) do |page|
		page.language_filter = code
		# Because one browser wants :enter and other :return -- sigh
		page.language_filter_element.send_keys [:enter, "\n"]
	end
end

Then(/^the panel is in English/) do
	on(PanelPage).panel_language_element.text.should == 'Language'
end

When(/^I switch to "Input" panel of language settings/) do
	on(PanelPage).panel_input_element.when_visible.click
end

Then(/^the language list of ULS should use Autonym font$/) do
	on(PanelPage).autonym_element.style("font-family").should == "'Autonym',sans-serif"
end

Then(/^the Interlanguage area should use Autonym font$/) do
	on(InterlanguagePage).interlang_link_element.style("font-family").should == "'Autonym',sans-serif"
end
